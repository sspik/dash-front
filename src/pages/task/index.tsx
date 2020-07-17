import React, {
  ChangeEvent,
  FC,
  useState,
} from "react";
import gql from "graphql-tag";
import moment from "moment"
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import {
  Step,
  StepLabel,
  Stepper,
  createStyles,
  makeStyles
} from "@material-ui/core";
import { Loading } from "components/loading/Loading";
import { GridContainer, GridItem } from "components/grid";
import { FileIcon } from "components/fileIcon/FileIcon";
import { FeedItem }  from "components/feed/FeedItem";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "components/card";
import { BBCode } from "components/BBcode/BBcode"
import { PostMessage } from "components/forms/PostMessage";

import {
  ITaskDetailState,
  IAddTaskMessageResponse,
  IAddTaskMessageVariables,
  ITaskData,
  ITaskDetailProps,
  TRouteParams
} from './interfaces';

const styles = createStyles({
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  card: {
    minHeight: "295px"
  },
  cardFooter: {
    width: "100%"
  }
});

const useStyles = makeStyles(styles);

const getTaskDetail = gql`
  query getTaskDetail($taskId: ID!) {
    GetTaskByID(taskId: $taskId) {
      id
      title
      description
      deadline
      startDatePlan
      endDatePlan
      priority
      responsible {
        id
        name
        link
        icon
      }
      creator {
        id
        name
        link
        icon
      }
      status
      dateStart
      durationFact
      durationType
      createdDate
      closedDate
      files {
        NAME
        SIZE
        DOWNLOAD_URL
        ID
        OBJECT_ID
      }
    }
    GetTaskComments(taskId: $taskId) {
      ID
      AUTHOR {
        ID
        NAME
        LAST_NAME
        PERSONAL_PHOTO
      }
      POST_MESSAGE
      POST_DATE
      FILES {
        NAME
        DOWNLOAD_URL
        SIZE
        ID
      }
    }
  }
`

const sendTaskMessage = gql`
  mutation SendTaskComment(
    $taskId: ID!
    $message: String!
  ) {
    SendTaskMessage(
      taskId: $taskId,
      message: $message,
    ) {
      result
    }
  }
`

const priority = {
  "0": "низкий",
  "1": "средний",
  "2": "высокий",
}

const taskSteps = [
  "Новая задача",
  "Задача выполняется",
  "Условно завершена (ждет контроля постановщиком)",
  "Задача завершена"
]



const initState: ITaskDetailState = {
  message: '',
}

const Task: FC<ITaskDetailProps> = (props) => {
  const classes = useStyles();
  const taskId = props.match.params.taskId;
  const [ state, setState ] = useState<ITaskDetailState>(initState)

  const [
    sendMessage,
    {
      error: sendTaskMessageError,
      loading: sendTaskMessageLoading,
    }
  ] = useMutation<
    IAddTaskMessageResponse,
    IAddTaskMessageVariables
    >(sendTaskMessage, {
      variables: {
        taskId,
        message: state.message,
      }
  })
  const { data, loading, error, refetch } = useQuery<
      ITaskData,
      TRouteParams
    >(getTaskDetail, {
    variables: { taskId },
    fetchPolicy: "no-cache"
  })
  if (!data && loading) return <Loading />;
  if (error) return <p>{ error.message }</p>;
  const handleChangeInput = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleSendMessage = async () => {
    const { message } = state;
    if (!message.length) return;
    const sendFeedResponse = await sendMessage({
      variables: {
        message,
        taskId
      }
    });
    if (sendFeedResponse.data &&
      sendFeedResponse.data.SendTaskMessage.result
    ) {
      setState({
        ...state,
        message: "",
      })
      refetch();
    }
  }

  const task = data!.GetTaskByID;
  const comments = data!.GetTaskComments;
  const taskStatus =  task.status > 4 ? 3 : task.status - 2;
  return (
    <div>
      { sendTaskMessageError && <p>{ sendTaskMessageError.message }</p> }
      <GridContainer>
        <GridItem
          xs={12}
          sm={12}
          md={7}
        >
          <Card className={classes.card}>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>
                { task.title }
              </h4>
            </CardHeader>
            <CardBody>
              { task.description
                  ? <BBCode content={task.description} />
                  : <p>Описание отсутствует</p>
              }
            </CardBody>
            { Array.isArray(task.files) &&
              <CardFooter>
                <GridContainer className={classes.cardFooter}>
                  { task.files.map(f => (
                    <GridItem xs={12} sm={2} md={2} key={f.ID}>
                      <FileIcon
                        { ...f }
                      />
                    </GridItem>
                  )) }
                </GridContainer>
              </CardFooter>
            }
          </Card>
        </GridItem>
        <GridItem
          xs={12}
          sm={12}
          md={5}
        >
          <Card>
            <CardBody>
              <Stepper
                alternativeLabel
                activeStep={taskStatus}
                nonLinear
              >
                { taskSteps.map(step => (
                  <Step key={step}>
                    <StepLabel>{ step }</StepLabel>
                  </Step>
                )) }
              </Stepper>
              <div>Приоритет {priority[task.priority]}</div>
              <div>Дата создания: { moment(task.createdDate).format("DD.MM.YYYY") }</div>
              <div>Постановщик: <Link
                to={`/dashboard/profile/${task.creator.id}`}
              >{ task.creator.name }</Link></div>
              <div>Ответственный: <Link
                to={`/dashboard/profile/${task.responsible.id}`}
              >{ task.responsible.name }</Link></div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <PostMessage
            message={state.message}
            loading={sendTaskMessageLoading}
            handleSendMessage={handleSendMessage}
            handleChangeInput={handleChangeInput}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        { comments.map(comment => (
          <FeedItem
            key={comment.ID}
            ID={comment.ID}
            AUTHOR={comment.AUTHOR}
            DETAIL_TEXT={comment.POST_MESSAGE}
            DATE_PUBLISH={comment.POST_DATE}
            FILES={comment.FILES}
          />
        )) }
      </GridContainer>
    </div>
  )
}

export default Task;

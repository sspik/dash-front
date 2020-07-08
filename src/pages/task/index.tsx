import React, {
  ChangeEvent,
  FC,
  useState,
} from "react";
import gql from "graphql-tag";
import moment from "moment"
import {useMutation, useQuery} from "@apollo/react-hooks";
import {Link, RouteComponentProps} from "react-router-dom";
import {
  Step,
  StepLabel,
  Stepper,
  createStyles,
  makeStyles
} from "@material-ui/core";
import { ITaskDetail, ITaskMessage } from "interfaces";
import { Loading } from "components/loading/Loading";
import { GridContainer, GridItem } from "components/grid";
import { CustomInput } from "components/input/CustomInput";
import { RegularButton } from "components/button/Button";
import { Spinner } from "components/loading/Spinner";
import { FileIcon } from "components/fileIcon/FileIcon";
import { FeedItem }  from "components/feed/FeedItem";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "components/card";
import { BBCode } from "components/BBcode/BBcode"


const styles = createStyles({
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
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
  mutation SendTaskComment($taskId: ID! $message: String!) {
    SendTaskMessage(taskId: $taskId, message: $message) {
      result
    }
  }
`

type iRouteParams = {
  taskId: string;
}

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

interface ITaskDetailProps extends RouteComponentProps<iRouteParams>{}
interface ITaskDetailState {
  message: string;
}
interface ITaskData {
  GetTaskByID: ITaskDetail;
  GetTaskComments: ITaskMessage[];
}
interface IAddTaskMessageVariables {
  taskId: string;
  message: string;
}

interface IAddTaskMessageResponse {
  error?: string;
  error_message?: string;
  result?: string;
}

export const Task: FC<ITaskDetailProps> = (props) => {
  const classes = useStyles();
  const taskId = props.match.params.taskId;
  const [ sendMessage ] = useMutation<
    IAddTaskMessageResponse,
    IAddTaskMessageVariables
    >(sendTaskMessage)
  const [ state, setState ] = useState<ITaskDetailState>({message: ''})
  const { data, loading, error } = useQuery<
      ITaskData,
      iRouteParams
    >(getTaskDetail, {
    variables: { taskId }
  })
  if (!data && loading) return <Loading />;
  if (error) return <p>{ error.message }</p>;
  const task = data!.GetTaskByID;
  const comments = data!.GetTaskComments;
  const taskStatus =  task.status > 4 ? 3 : task.status - 2;
  return (
    <div>
      <GridContainer>
        <GridItem
          xs={12}
          sm={12}
          md={7}
        >
          <Card>
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
                <GridContainer>
                  { task.files.map(f => (
                    <GridItem xs={12} sm={5} md={5} key={f.ID}>
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
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>
                Написать комментарий к задаче
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Введите сообщение"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 2,
                      onChange: (event: ChangeEvent<HTMLTextAreaElement>) =>
                        setState({
                          ...state,
                          message: event.target.value
                        })
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <RegularButton
                color="info"
                disabled={!!loading}
                onClick={async () => {
                  const resp = await sendMessage({
                    variables: {
                      taskId,
                      message: state.message
                    }
                  });
                  // TODO Недописана отправка сообщения
                }}
              >
                Отправить
              </RegularButton>
              { loading && <Spinner />  }
            </CardFooter>
          </Card>
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

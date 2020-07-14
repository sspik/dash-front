import React, { FC, useState } from 'react';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";

import { GridItem, GridContainer } from "components/grid";
import { CustomInput } from "components/input/CustomInput";
import { RegularButton } from "components/button/Button";
import { FeedList } from "components/feed/FeedList";
import { Loading } from "components/loading/Loading";
import {
  CardHeader,
  CardBody,
  Card,
  CardFooter,
} from "components/card";
import { Spinner } from "components/loading/Spinner";
import { FileUploader } from "components/fileUploader/FileUploader";
import { IFeedResponse, ISendFeedResponse } from "interfaces";

import styles from "assets/jss/pages/feedStyle";


const useStyles = makeStyles(styles);

const getFeed = gql`
  query getFeed($start: Int = 0) {
    GetFeed(start: $start) {
      next
      total
      result {
        ID
        DATE_PUBLISH
        DETAIL_TEXT
        AUTHOR {
          ID
          NAME
          LAST_NAME
          PERSONAL_PHOTO
        }
        FILES {
          NAME
          DOWNLOAD_URL
          SIZE
          ID
        }
      }
    }
  }
`;

const SendMessage = gql`
  mutation SendMessage(
    $title: String
    $message: String!
    $files: [String]
  ) {
    SendFeedMessage(
      message: $message
      title: $title
      files: $files
    ) {
      result
    }
  }
`

interface ISendFeedVariables {
  message: string,
  title: string,
  files: string[],
}

interface IFeedState extends ISendFeedVariables {
  start: number;
}

const initState: IFeedState = {
  start: 0,
  message: "",
  title: "",
  files: [],
}

export const Feed: FC = () => {
  const [ state, setState ] = useState<IFeedState>(initState)
  const classes = useStyles();

  const {
    data: feedData,
    loading: feedLoading,
    error: feedError,
    fetchMore
  } = useQuery<
    IFeedResponse,
    { start: number }
    >(getFeed, {
      variables: { start: state.start }
  });

  const [
    sendFeedMessage,
    {
      loading: sendFeedLoading,
      error: sendFeedError,
    }
  ] = useMutation<
    ISendFeedResponse,
    ISendFeedVariables
    >(SendMessage);

  if (!feedData && feedLoading) return <Loading />;
  if (feedError) return <p>{ feedError }</p>;
  const handleAttachedFile = (filesId: string[]): void => {
    setState({
      ...state,
      files: filesId
    })
  }
  const feeds = feedData!.GetFeed;
  const handleFetchMore = (next: number) => {
    fetchMore({
      variables: { start: next },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          GetFeed: {
            ...previousResult.GetFeed,
            next: fetchMoreResult!.GetFeed.next,
            result: [
              ...previousResult.GetFeed.result,
              ...fetchMoreResult!.GetFeed.result
            ]
          }

        }
      }
    })
  };
  const handleSendMessage = async () => {
    const { title, message, files } = state;
    if (!message.length) return;
    const sendFeedResponse = await sendFeedMessage({
      variables: { title, message, files }
    });
    if (sendFeedResponse.data &&
      sendFeedResponse.data.SendMessage.result
    ) {
      handleFetchMore(0)
    }
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={7} md={7}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Сообщение в живую ленту</h4>
            </CardHeader>
            <CardBody>
              <CustomInput
                labelText="Заголовок"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: (event) =>
                    setState({
                      ...state,
                      title: event.target.value,
                    })
                }}
              />
              <CustomInput
                labelText="Сообщение"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  multiline: true,
                  rows: 2,
                  value: state.message,
                  onChange: (event) =>
                    setState({
                      ...state,
                      message: event.target.value
                    })
                }}
              />
            </CardBody>
            <CardFooter>
              <div className={classes.footer}>
                <RegularButton
                  color="info"
                  disabled={!!feedLoading}
                  onClick={() => handleSendMessage()}
                >
                  Отправить
                </RegularButton>
                { feedLoading ? <Spinner /> : null }
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={5} md={5}>
          <FileUploader
            handleAttachedFile={handleAttachedFile}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <FeedList
          { ...feeds }
        />
      </GridContainer>
      { feeds.next
        && <div>
          <RegularButton
            color="primary"
            onClick={() => handleFetchMore(feeds.next!)}
          >
            Больше сообщений
          </RegularButton>
        </div>
      }
    </div>

  )
};

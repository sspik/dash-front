import React, { ChangeEvent, FC, useState } from 'react';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { Fade } from "@material-ui/core";

import { Loading } from "components/loading/Loading";
import { GridContainer, GridItem } from "components/grid";
import { PostMessage } from "components/forms/PostMessage";
import { FileUploader } from "components/fileUploader/FileUploader";
import { RegularButton } from "components/button/Button";
import { FeedList } from "./FeedList";

import {
  IFeedProps,
  IFeedResponse,
  IFeedState,
  IGetFeedVariables,
  ISendFeedResponse,
  ISendFeedVariables,
} from "./interfaces";


const GetFeed = gql`
  query GetFeed (
    $start: Int = 0,
    $filter: [String]
  ) {
    GetFeed(start: $start filter: $filter){
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
          WORK_POSITION
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
`

const SendMessage = gql`
  mutation SendMessage(
    $title: String
    $message: String!
    $files: [UploadFix]
    $showFor: [String]
  ) {
    SendFeedMessage(
      message: $message
      title: $title
      files: $files
      showFor: $showFor
    ) {
      result
    }
  }
`

const initState: IFeedState = {
  title: "",
  message: "",
  start: 0,
  files: []
}

export const FeedContainer: FC<IFeedProps> = (props) => {
  const { showMessageFor, filter } = props;
  const [ state, setState ] = useState(initState);
  const {
    data: feedData,
    loading: feedLoading,
    error: feedError,
    fetchMore,
    refetch,
  } = useQuery<
    IFeedResponse,
    IGetFeedVariables
    >(GetFeed, {
    variables: { start: state.start, filter },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
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

  const handleAttachedFile = (files: File[]): void => {
    setState({
      ...state,
      files: state.files.concat(files)
    })
  }
  const handleDeleteAttachedFile = (file: File): void => {
    setState({
      ...state,
      files: state.files.filter(f => f !== file)
    })
  }
  const handleChangeInput = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  const feeds = feedData!.GetFeed;
  const handleFetchMore = (next: number) => {
     fetchMore({
       variables: { start: next, filter },
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
      variables: {
        title,
        message,
        files,
        showFor: showMessageFor,
      }
    });
    if (sendFeedResponse.data &&
      sendFeedResponse.data.SendFeedMessage
    ) {
      setState({
        ...state,
        files: [],
        title: "",
        message: "",
      })
      refetch();
    }
  }
  return (
    <div>
      { feedLoading && <Loading /> }
      <Fade in timeout={300}>
        <GridContainer>
          <GridItem xs={12} sm={7} md={7}>
            <PostMessage
              title={state.title}
              message={state.message}
              loading={sendFeedLoading}
              handleSendMessage={handleSendMessage}
              handleChangeInput={handleChangeInput}
              sendFeedError={sendFeedError}
            />
          </GridItem>
          <GridItem xs={12} sm={5} md={5}>
            <FileUploader
              handleAttachedFile={handleAttachedFile}
              handleDeleteAttachedFile={handleDeleteAttachedFile}
              files={state.files}
            />
          </GridItem>
        </GridContainer>
      </Fade>
      <GridContainer>
        { feeds.result.length &&
          <Fade in timeout={400}>
            <FeedList
              { ...feeds }
            />
          </Fade>
        }
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
}

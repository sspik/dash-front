import React, { FC, useState, useMemo, useCallback } from 'react';
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from 'react-dropzone'

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
import { IFeedResponse } from "interfaces";
import { Spinner } from "components/loading/Spinner";

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

const SendAttachment = gql`
  mutation AttachmentUpload($folderId: ID! $files: [UploadFix!]!){
    AttachmentUpload(folderId: $folderId files: $files) {
      ID
      NAME
      DOWNLOAD_URL
    }
  }
`

interface IFeedState {
  start: number;
  userMessage: string;
}

const initState: IFeedState = {
  start: 0,
  userMessage: "",
}

interface ISendAttachmentVariables {
  folderId: string;
  files: any[];
}

export const Feed: FC = () => {
  const [ state, setState ] = useState<IFeedState>(initState)
  const classes = useStyles();
  const { data, loading, error, fetchMore } = useQuery<
    IFeedResponse,
    { start: number }
    >(getFeed, {
      variables: { start: state.start }
  });
  const [ uploadAttachment ] = useMutation<any, ISendAttachmentVariables>(SendAttachment);

  const onDrop = useCallback(() => async (acceptedFiles: any[]) => {
    console.log(acceptedFiles)
    await uploadAttachment({
      variables: {
        folderId: process.env.BITRIX24_UPLOAD_FOLDER_ID!,
        files: acceptedFiles,
      }
    })
  }, [uploadAttachment])
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
  });
  const dropZoneStyle = useMemo(() => ({
    ...styles.dropZoneBase,
    ...(isDragActive ? styles.active : {}),
    ...(isDragAccept ? styles.accept : {}),
    ...(isDragReject ? styles.reject : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);
  if (!data && loading) return <Loading />;
  if (error) return <p>{ error }</p>;
  const feeds = data!.GetFeed;
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
                labelText="Введите сообщение"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  multiline: true,
                  rows: 2,
                  value: state.userMessage,
                  onChange: (event) =>
                    setState({
                      ...state,
                      userMessage: event.target.value
                    })
                }}
              />
            </CardBody>
            <CardFooter>
              <div className={classes.footer}>
                <RegularButton
                  color="info"
                  disabled={!!loading}
                >
                  Отправить
                </RegularButton>
                { loading ? <Spinner /> : null }
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={5} md={5}>
          <Card>
            <CardBody>
              <div {...getRootProps({ style: dropZoneStyle })}>
                <input
                  { ...getInputProps() }
                />
                <p>Перетащите сюда файлы или нажмите для выбора</p>
              </div>
            </CardBody>
          </Card>
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

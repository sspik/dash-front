import React, { FC, useMemo, useState } from 'react';
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";

import { Badge, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { Card, CardBody, CardFooter } from "components/card";
import { RegularButton } from "components/button/Button";

import { IAttachedFile } from "interfaces";
import { BITRIX_UPLOAD_FOLDER } from "../../constants";

import styles from "assets/jss/components/fileUpalodStyle";

const useStyles = makeStyles(styles);

const SendFile = gql`
  mutation UploadFile($folderId: ID! $files: [UploadFix!]!){
    UploadFile(folderId: $folderId files: $files) {
      ID
      NAME
    }
  }
`

const DeleteFile = gql`
  mutation DeleteFile($id: ID!){
    DeleteFile(id: $id) {
      result
    }
  }
`

interface IFileUploadState {
  ID: string;
  NAME: string;
}

interface IFileUploadProps {
  handleAttachedFile: (filesId: string[]) => void;
}

interface ISendFileVariables {
  folderId: string;
  files: IAttachedFile[];
}

interface ISendFileResponse {
  UploadFile: IFileUploadState[]
}

interface IDeleteFiletVariables {
  id: string;
}

interface IDeleteFileResponse {
  DeleteFile: {
    result: boolean;
  }
}

const initState: Array<IFileUploadState> = [];

export const FileUploader: FC<IFileUploadProps> = (props) => {
  const classes = useStyles();
  const { handleAttachedFile } = props;
  const [ state, setState ] = useState(initState);

  const [
    uploadAttachment,
    {
      loading: loadingAttachment,
      error: errorAttachment
    }
  ] = useMutation<
    ISendFileResponse,
    ISendFileVariables
    >(SendFile);

  const [
    deleteFile,
    {
      loading: deleteLoading,
      error: deleteError,
    }
  ] = useMutation<
    IDeleteFileResponse,
    IDeleteFiletVariables
    >(DeleteFile);

  const handleDeleteFile = async (fileId: string) => {
    const deleteFileResponse = await deleteFile({
      variables: {id: fileId}
    });
    if (deleteFileResponse.data &&
      deleteFileResponse.data.DeleteFile.result) {
      setState(state.filter((file) => file.ID !== fileId));
      handleAttachedFile(state.map(file => file.ID))
    }
  }
  const onDrop = async (acceptedFiles: any[]) => {
    const uploadedFiles = await uploadAttachment({
      variables: {
        folderId: BITRIX_UPLOAD_FOLDER,
        files: acceptedFiles
      }
    });
    setState([
      ...state,
      ...uploadedFiles.data!.UploadFile,
    ])
    handleAttachedFile(state.map(file => file.ID))
  }
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop
  });

  const dropZoneStyle = useMemo(() => ({
    ...styles.dropZoneBase,
    ...(isDragActive ? styles.active : {}),
    ...(isDragAccept ? styles.accept : {}),
    ...(isDragReject ? styles.reject : {}),
    ...(loadingAttachment || deleteLoading ? styles.loading : {}),
  }), [
    isDragActive,
    isDragReject,
    isDragAccept,
    loadingAttachment,
  ]);
  if ( errorAttachment ) return <p>{ errorAttachment.message }</p>;
  if ( deleteError ) return <p>{ deleteError.message }</p>;
  return (
    <Card>
      <CardBody>
        <div {...getRootProps({ style: dropZoneStyle })}>
          <input
            { ...getInputProps() }
          />
          { loadingAttachment
            ? <p>Загружаю, подождите</p>
            : <p>Перетащите сюда файлы или нажмите для выбора</p>
          }
        </div>
      </CardBody>
      <CardFooter>
        <div className={classes.fileContainer}>
          { state.map(( file ) => (
            <div className={classes.fileItem} key={file.ID}>
              <Card className={classes.file}>
                <Badge
                  key={file.ID}
                  badgeContent={(
                    <RegularButton
                      color="primary"
                      justIcon
                      round
                      size="sm"
                      className={classes.deleteButton}
                      onClick={() => handleDeleteFile(file.ID)}
                    >
                      <Close />
                    </RegularButton>
                  )}
                >
                  { file.NAME }
                </Badge>
              </Card>
            </div>
          )) }
        </div>
      </CardFooter>
    </Card>
  )
}

import React, { FC, useMemo, useCallback } from 'react';
import gql from "graphql-tag";

import { useDropzone } from "react-dropzone";
import { BITRIX_UPLOAD_FOLDER } from "../../constants";
import { useMutation } from "@apollo/react-hooks";
import styles from "assets/jss/pages/feedStyle";
import {IAttachedFile} from "../../interfaces";

interface ISendAttachmentVariables {
  folderId: string;
  files: IAttachedFile[];
}

const SendAttachment = gql`
  mutation AttachmentUpload($folderId: ID! $files: [UploadFix!]!){
    AttachmentUpload(folderId: $folderId files: $files) {
      ID
      NAME
      DOWNLOAD_URL
    }
  }
`

export const FileUploader: FC = () => {

  const [ uploadAttachment ] = useMutation<
    any,
    ISendAttachmentVariables
    >(SendAttachment);

  const onDrop = useCallback(async (acceptedFiles) => {
    await uploadAttachment({
      variables: {
        folderId: BITRIX_UPLOAD_FOLDER,
        files: acceptedFiles
      }
    })
  }, []);

  const {
    acceptedFiles,
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
    ...(isDragReject ? styles.reject : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  return (
    <div {...getRootProps({ style: dropZoneStyle })}>
      <input
        { ...getInputProps() }
      />
      <p>Перетащите сюда файлы или нажмите для выбора</p>
    </div>
  )
}

import React, { FC, useMemo, useState} from 'react';
import { useDropzone } from "react-dropzone";

import { Badge, makeStyles } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { Card, CardBody, CardFooter } from "components/card";
import { RegularButton } from "components/button/Button";

import styles from "assets/jss/components/fileUpalodStyle";

const useStyles = makeStyles(styles);

interface IFileUploadProps {
  handleAttachedFile: (files: File[]) => void;
  handleDeleteAttachedFile: (file: File) => void;
  files: File[];
}

const initState: Array<File> = [];

export const FileUploader: FC<IFileUploadProps> = (props) => {
  const classes = useStyles();
  const { handleAttachedFile, handleDeleteAttachedFile, files } = props;

  const handleDeleteFile = async (file: File) => {
    handleDeleteAttachedFile(file);
  }
  const onDrop = async (acceptedFiles: any[]) => {
    handleAttachedFile(acceptedFiles);
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
  }), [
    isDragActive,
    isDragReject,
    isDragAccept,
  ]);
  return (
    <Card>
      <CardBody>
        <div {...getRootProps({ style: dropZoneStyle })}>
          <input
            { ...getInputProps() }
          />
          <p>Перетащите сюда файлы или нажмите для выбора</p>
        </div>
      </CardBody>
      <CardFooter>
        <div className={classes.fileContainer}>
          { files.map(( file, index ) => (
            <div className={classes.fileItem} key={index}>
              <Card className={classes.file}>
                <Badge
                  badgeContent={(
                    <RegularButton
                      color="primary"
                      justIcon
                      round
                      size="sm"
                      className={classes.deleteButton}
                      onClick={() => handleDeleteFile(file)}
                    >
                      <Close />
                    </RegularButton>
                  )}
                >
                  { file.name }
                </Badge>
              </Card>
            </div>
          )) }
        </div>
      </CardFooter>
    </Card>
  )
}

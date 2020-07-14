import React, {ChangeEvent, FC} from 'react';
import { ApolloError } from "apollo-client";

import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader
} from "components/card";
import { CustomInput } from "components/input/CustomInput";
import { RegularButton } from "components/button/Button";
import { Spinner } from "components/loading/Spinner";

import styles from 'assets/jss/components/postMessageStyle';

const useStyles = makeStyles(styles);

interface IPostMessageProps {
  title: string;
  message: string;
  loading: boolean;
  handleSendMessage: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  sendFeedError?: ApolloError;
}

export const PostMessage: FC<IPostMessageProps> = (props) => {
  const {
    title,
    message,
    loading,
    handleChangeInput,
    handleSendMessage,
    sendFeedError,
  } = props;
  const classes = useStyles()
  return (
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Отправить сообщение</h4>
      </CardHeader>
      <CardBody>
        <CustomInput
          labelText="Заголовок"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            value: title,
            name: 'title',
            onChange: (event) => handleChangeInput(event)
          }}
        />
        <CustomInput
          labelText="Сообщение"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            multiline: true,
            rows: 2,
            value: message,
            name: 'message',
            onChange: (event) => handleChangeInput(event)
          }}
        />
      </CardBody>
      <CardFooter>
        <div className={classes.cardFooter}>
          <RegularButton
            color="info"
            onClick={() => handleSendMessage()}
          >
            Отправить
          </RegularButton>
          <div className={classes.sendInfo}>
            { loading && <Spinner /> }
            { sendFeedError && <p>{ sendFeedError.message }</p> }
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
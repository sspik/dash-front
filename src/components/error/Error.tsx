import React, { FC } from 'react';
import { Helmet } from "react-helmet";
import { makeStyles } from "@material-ui/core";
import { Error as ErrorIcon } from "@material-ui/icons"

import { IPositionsErrorProps } from "./interfaces";
import styles from "assets/jss/components/errorStyle";

const useStyles = makeStyles(styles);

export const Error: FC<IPositionsErrorProps> = (props) => {
  const classes = useStyles();
  const { error } = props;
  const message = error.graphQLErrors.map(e => e.message).join(', ')
  return (
    <div className={classes.errorContainer}>
      <Helmet>
        <title>Ошибка: {message}</title>
      </Helmet>
      <div className={classes.errorIcon}>
        <ErrorIcon fontSize="large" color="secondary" />
      </div>
      <div className={classes.errorMessage}>{ message }</div>
    </div>
  )
}
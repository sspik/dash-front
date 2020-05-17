import React, { FC } from 'react';
import { CircularProgress } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core";
import { dangerColor } from "assets/jss/all";

const useStyles = makeStyles(createStyles({
  spinner: {
    color: dangerColor[0]
  }
}))

export const Spinner: FC = () => {
  const classes = useStyles();
  return <CircularProgress className={classes.spinner} />
}

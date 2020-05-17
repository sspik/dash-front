import React from 'react';
import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styles from 'assets/jss/components/loadingStyle';

const useStyles = makeStyles(styles);

export const Loading: React.FC = () => {
  const classes = useStyles();
  return (
    <LinearProgress
      color="secondary"
      className={classes.loadingTop}
    />
  )
}

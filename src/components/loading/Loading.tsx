import React from 'react';
import { Helmet } from "react-helmet";
import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styles from 'assets/jss/components/loadingStyle';

const useStyles = makeStyles(styles);

export const Loading: React.FC = () => {
  const classes = useStyles();
  return (
    <>
      <Helmet>
        <title>Загрузка</title>
      </Helmet>
      <LinearProgress
        color="secondary"
        className={classes.loadingTop}
      />
    </>
  )
}

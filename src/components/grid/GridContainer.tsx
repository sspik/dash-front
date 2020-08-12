import React, { FC } from 'react';
import classNames from "classnames";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import { IGridContainerProps } from "./interfaces";

const styles = createStyles({
  grid: {
    margin: "0 -15px !important",
    width: "unset"
  }
})

const useStyles = makeStyles(styles);

export const GridContainer: FC<IGridContainerProps> = (props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid
      container
      { ...rest }
      className={classNames(classes, className)}
    >
      { children ? children : null }
    </Grid>
  )
};

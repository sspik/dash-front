import React, { FC } from 'react';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Grid  from "@material-ui/core/Grid";
import classNames from "classnames";

import { IGridItemProps } from "./interfaces";

const styles = createStyles({
  grid: {
    padding: "0 15px !important"
  }
});

const useStyles = makeStyles(styles);



export const GridItem: FC<IGridItemProps> = (props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid item { ...rest } className={classNames(classes.grid, className)}>
      { children ? children : null }
    </Grid>
  )
};

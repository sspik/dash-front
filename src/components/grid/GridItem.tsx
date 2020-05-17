import React, { FC, ReactNode } from 'react';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Grid, { GridProps } from "@material-ui/core/Grid";
import classNames from "classnames";

const styles = createStyles({
  grid: {
    padding: "0 15px !important"
  }
});

const useStyles = makeStyles(styles);

interface IGridItemProps extends GridProps {
  children?: ReactNode;
  className?: string;
}

export const GridItem: FC<IGridItemProps> = (props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid item { ...rest } className={classNames(classes.grid, className)}>
      { children ? children : null }
    </Grid>
  )
};

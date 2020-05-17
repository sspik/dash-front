import React, { FC, ReactNode } from 'react';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Grid, { GridProps } from "@material-ui/core/Grid";

interface IGridContainerProps extends GridProps {
  children?: ReactNode;
}

const styles = createStyles({
  grid: {
    margin: "0 -15px !important",
    width: "unset"
  }
})

const useStyles = makeStyles(styles);

export const GridContainer: FC<IGridContainerProps> = (props) => {
  const classes = useStyles();
  const { children, ...rest } = props;
  return (
    <Grid container { ...rest } className={classes.grid}>
      { children ? children : null }
    </Grid>
  )
};

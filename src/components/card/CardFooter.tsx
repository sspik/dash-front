import React, { FC } from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import { ICardFooterProps } from "./interfaces";

import styles from 'assets/jss/components/cardFooterStyle';

const useStyles = makeStyles(styles);


export const CardFooter: FC<ICardFooterProps> = (props) => {
  const classes = useStyles();
  const {
    className,
    children,
    plain,
    profile,
    stats,
    chart,
    ...rest
  } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className!]: className
  });
  return (
    <div className={ cardFooterClasses } { ...rest }>
      {children}
    </div>
  )
}

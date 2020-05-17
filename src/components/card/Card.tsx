import React, { FC, ReactNode } from "react";
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/components/cardStyle';

const useStyles = makeStyles(styles);

interface ICardProps {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  chart?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

export const Card: FC<ICardProps> = (props) => {
  const classes = useStyles();
  const {
    className,
    children,
    plain,
    profile,
    chart,
    ...rest
  } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className!]: className
  });
  return (
    <div className={ cardClasses } { ...rest }>
      { children }
    </div>
  )
}

import React, { FC } from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import { ICardHeaderProps } from "./interfaces";

import styles from "assets/jss/components/cardHeaderStyle";

const useStyles = makeStyles(styles);

export const CardHeader: FC<ICardHeaderProps> = (props) => {
  const classes = useStyles();
  const {
    className,
    children,
    color,
    plain,
    stats,
    icon,
    hover,
    ...rest
  } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader` as "primaryCardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [classes.cardHeaderHover]: hover === "true",
    [className!]: className
  });
  return (
    <div className={ cardHeaderClasses } { ...rest }>
      {children}
    </div>
  )
};

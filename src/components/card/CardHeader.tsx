import React, { FC, ReactNode } from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/components/cardHeaderStyle";
import { iCardHeaderColor } from "../../interfaces";

const useStyles = makeStyles(styles);

interface ICardHeaderProps {
  className?: string;
  color: iCardHeaderColor;
  plain?: boolean;
  stats?: boolean;
  icon?: boolean;
  children?: ReactNode;
  [key: string]: any
}

export const CardHeader: FC<ICardHeaderProps> = (props) => {
  const classes = useStyles();
  const {
    className,
    children,
    color,
    plain,
    stats,
    icon,
    ...rest
  } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader` as "primaryCardHeader"]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className!]: className
  });
  return (
    <div className={ cardHeaderClasses } { ...rest }>
      {children}
    </div>
  )
};

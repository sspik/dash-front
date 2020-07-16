import React, { FC } from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import styles from "assets/jss/components/cardIconStyle";
import { ICardIconProps } from "./interfaces";

const useStyles = makeStyles(styles);


export const CardIcon: FC<ICardIconProps> = (props) => {
  const classes = useStyles();
  const {
    className,
    children,
    color,
    ...rest
  } = props;
  const cardIconClasses = classNames({
    [classes.cardIcon]: true,
    [classes[color + "CardHeader" as "primaryCardHeader"]]: color,
    [className!]: className
  });
  return (
    <div className={ cardIconClasses } { ...rest }>
      {children}
    </div>
  );
};

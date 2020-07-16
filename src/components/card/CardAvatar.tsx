import React, { FC } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import { ICardAvatarProps } from "./interfaces";

import styles from 'assets/jss/components/cardAvatarStyle';

const useStyles = makeStyles(styles);



export const CardAvatar: FC<ICardAvatarProps> = (props) => {
  const classes = useStyles();
  const {
    children,
    className,
    plain,
    profile,
    ...rest
  } = props;
  const cardAvatarClasses = classNames({
    [classes.cardAvatar]: true,
    [classes.cardAvatarProfile]: profile,
    [classes.cardAvatarPlain]: plain,
    [className!]: className
  });
  return (
    <div className={cardAvatarClasses} {...rest}>
      {children}
    </div>
  )
}

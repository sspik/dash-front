import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import styles from 'assets/jss/components/cardAvatarStyle';

const useStyles = makeStyles(styles);

interface ICardAvatarProps {
  children: ReactNode;
  className?: string;
  profile?: boolean;
  plain?: boolean;
  [key: string]: any;
}

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

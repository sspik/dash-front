import React, { FC, ReactNode } from 'react';
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { iInputColor } from "interfaces";
import styles from 'assets/jss/components/buttonStyle';

interface IButtonProps {
  color: iInputColor;
  size?: "sm" | "lg";
  simple?: boolean;
  round?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  className?: string
  muiClasses?: object;
  href?: string;
  children?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}

const useStyles = makeStyles(styles);

export const RegularButton: FC<IButtonProps> = (props) => {
  const classes = useStyles();
  const {
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    href,
    ...rest
  } = props;
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size!]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className!]: className
  });
  return (
    <Button {...rest} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  )
};

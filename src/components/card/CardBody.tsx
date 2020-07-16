import React, { FC } from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import { ICardBodyProps } from './interfaces'

import styles from 'assets/jss/components/cardBodyStyle';

const useStyles = makeStyles(styles);



export const CardBody: FC<ICardBodyProps> = (props) => {
  const classes = useStyles();
  const {
    className,
    children,
    plain,
    profile,
    underHover,
    ...rest
  } = props;
  const cardBodyClasses = classNames({
    [classes.cardBody]: true,
    [classes.cardBodyPlain]: plain,
    [classes.cardBodyProfile]: profile,
    [className!]: className
  });
  return (
    <div className={cardBodyClasses} { ...rest }>
      { underHover && (
        <div className={classes.underHover}>
          { underHover }
        </div>
      ) }
      { children }
    </div>
  );
}

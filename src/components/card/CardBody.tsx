import React, { FC, ReactNode } from 'react';
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import styles from 'assets/jss/components/cardBodyStyle';

const useStyles = makeStyles(styles);

interface ICardBodyProps {
  className?: string;
  plain?: string;
  profile?: boolean;
  children: ReactNode;
  underHover?: ReactNode;
  [key: string]: any;
}

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

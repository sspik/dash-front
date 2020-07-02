import React, {
  FC,
  ReactNode,
  cloneElement,
  useState,
  Children,
  isValidElement,
} from "react";

import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import styles from 'assets/jss/components/cardStyle';

const useStyles = makeStyles(styles);

interface ICardProps {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  chart?: boolean;
  hovered?: boolean;
  children: ReactNode;
}

export const Card: FC<ICardProps> = (props) => {
  const classes = useStyles();
  const [ hover, setHover ] = useState(false);
  const handleMouseLeave = () => setHover(false);
  const handleMouseEnter = () => setHover(true);
  const {
    className,
    children,
    plain,
    profile,
    chart,
    hovered,
    ...rest
  } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className!]: className
  });
  const elements = Children.map(children, (child: ReactNode) => {
    if (!hovered || !isValidElement(child)) return child;
    // @ts-ignore
    const childName = child.type.name;
    if (childName !== 'CardHeader') return child;
    return cloneElement(child, { hover: hover.toString() })
  })
  return (
    <div
      className={ cardClasses }
      onMouseLeave={ handleMouseLeave }
      onMouseEnter={ handleMouseEnter }
      { ...rest }
    >
      { elements }
    </div>
  )
}

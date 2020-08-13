import React, {FC, useEffect, useState} from 'react';
import classNames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

import { RegularButton } from "components/button/Button";
import styles from "assets/jss/scrollToTopStyle"

const useStyles = makeStyles(styles);

interface IScrollButtonProps {
  contentRef: any,
}

export const ScrollButton: FC<IScrollButtonProps> = (props) => {
  const classes = useStyles();
  const { contentRef } = props;
  const scrollToTop = () => {
    if (!contentRef || !contentRef.current) return
    contentRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const [show, setShow] = useState(false)

  useEffect(() => {
    const ref = contentRef;
    if (!ref || !ref.current) return
    function onScroll() {
      if (!ref || !ref.current) return
      setShow(
        ref.current.scrollTop > 150
      )
    }
    ref.current.addEventListener("scroll", onScroll);
    return function cleanUp(){
      if (ref && ref.current) {
        ref.current.removeEventListener("scroll", onScroll)
      }
    }
  });

  const arrayClasses = classNames(
    classes.arrowUp,
    { [classes.visibleArray]: show }
  )

  return (
    <aside className={arrayClasses}>
      <RegularButton
        color="white"
        justIcon
        size="lg"
        round
        onClick={() => scrollToTop()}
      >
        <ArrowUpwardIcon />
      </RegularButton>
    </aside>
  )
}
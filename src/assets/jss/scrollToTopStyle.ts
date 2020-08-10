import { createStyles } from "@material-ui/core";

const scrollToTopStyle = createStyles({
  arrowUp: {
    position: "fixed",
    bottom: "15px",
    right: "-160px",
    zIndex: 10,
    transition: 'all 0.5s ease-in-out',
    transitionProperty: 'opacity, right',
  },
  visibleArray: {
    right: "20px"
  }
});

export default scrollToTopStyle;
import { createStyles } from "@material-ui/core";
import { dangerColor } from "assets/jss/all";

const loadingStyle = createStyles({
  loadingTop: {
    position: "fixed",
    left: "0",
    top: "0",
    width: "100vw",
    zIndex: 100,
    color: dangerColor[0]
  }
});

export default loadingStyle;

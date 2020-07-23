import { grayColor } from "assets/jss/all";

import { createStyles } from "@material-ui/core";

export default createStyles({
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    width: "120px",
    alignItems: "center",
    "&:hover": {
      textDecoration: "none"
    },
    color: grayColor[8],
  },
  iconIcon: {
    width: "100px",
    "& svg": {
      height: "75px"
    }
  },
  iconText: {
    fontSize: "12px",
    textAlign: "center",
    lineHeight: "15px",
    maxWidth: "75px",
  }
});

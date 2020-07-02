import {
  defaultFont,
  primaryColor,
  dangerColor,
  grayColor
} from "assets/jss/all";
import tooltipStyle from "assets/jss/tooltipStyle";
import checkboxAndRadioStyle from "assets/jss/chechboxAndRadioStyle";
import { createStyles } from "@material-ui/core";

const tableTaskStyle = createStyles({
  ...tooltipStyle,
  ...checkboxAndRadioStyle,
  table: {
    marginBottom: "0",
    overflow: "visible"
  },
  tableRow: {
    position: "relative",
    marginTop: "10px",
    "&Collapse": {
      borderBottom: "1px solid " + grayColor[5]
    }
  },
  tableActions: {
    display: "flex",
    border: "none",
    padding: "12px 8px !important",
    verticalAlign: "middle",
    flex: "0 0 100px",
  },
  tableCell: {
    ...defaultFont,
    padding: "8px",
    alignSelf: "center",
    border: "none",
    lineHeight: "1.42857143",
    fontSize: "14px",
    "&Collapse": {
      padding: "0 8px"
    },
  },
  tableActionButton: {
    width: "27px",
    height: "27px",
    padding: "0"
  },
  tableActionButtonIcon: {
    width: "17px",
    height: "17px"
  },
  edit: {
    backgroundColor: "transparent",
    color: primaryColor[0],
    boxShadow: "none"
  },
  close: {
    backgroundColor: "transparent",
    color: dangerColor[0],
    boxShadow: "none"
  }
});

export default tableTaskStyle;

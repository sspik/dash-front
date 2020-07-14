import {
  primaryColor,
  dangerColor,
  infoColor, warningColor,
} from 'assets/jss/all'
import { createStyles } from "@material-ui/core";

const feedStyle = createStyles({
  footer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  sendInfo: {
    marginLeft: 10
  }
})
export default feedStyle;
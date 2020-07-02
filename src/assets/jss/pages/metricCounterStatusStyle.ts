import { grayColor, defaultFont } from "assets/jss/all"
import { createStyles } from "@material-ui/core";

const metricStyle = createStyles({
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  counterCardHeader: {
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    textAlign: "center",
    fontSize: "20px"
  },
  counterCardBody: {
    textAlign: "center",
    fontSize: "16px"
  },
  counterCard: {
    height: "150px"
  }
});

export default metricStyle;

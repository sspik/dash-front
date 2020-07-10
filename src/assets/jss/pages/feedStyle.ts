import {
  primaryColor,
  dangerColor,
  infoColor,
} from 'assets/jss/all'
import { createStyles } from "@material-ui/core";

const feedStyle = createStyles({
  footer: {
    width: "100%"
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
  fileInput: {
    display: "none",
  },
  dropZoneBase: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'all .24s ease-in-out',
    justifyContent: "center",
    cursor: "pointer",
  },
  active: {
    borderColor: infoColor[0],
    color: infoColor[0]
  },
  reject: {
    borderColor: dangerColor[0]
  },
  accept: {
    borderColor: primaryColor[0],
    color: primaryColor[0]
  }
})
export default feedStyle;
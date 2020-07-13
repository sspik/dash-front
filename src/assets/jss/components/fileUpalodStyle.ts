import { createStyles } from "@material-ui/core";
import {dangerColor, infoColor, primaryColor, warningColor} from "../all";

const fileUploadStyle = createStyles({
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
  },
  loading: {
    borderColor: warningColor[0],
    color: warningColor[0]
  },
  fileContainer: {
    width: "100% !important",
    display: "flex",
    flexWrap: "wrap",
  },
  fileItem: {
    margin: "10px",
    marginRight: "35px",

  },
  file: {
    padding: 10,
    marginTop: 5,
    marginBottom: 5
  },
  deleteButton: {
    width: 25,
    height: 25,
    minWidth: 25,
  }
});

export default fileUploadStyle;
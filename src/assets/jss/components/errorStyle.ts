import { createStyles } from "@material-ui/core/styles";

const errorStyle = createStyles({
  errorContainer: {
    width: "100%",
    height: "auto",
    textAlign: "center",
  },
  errorIcon: {
    "& svg": {
      fontSize: "10rem"
    },
    marginTop: "150px"
  },
  errorMessage: {
    fontSize: "2.7rem",
    lineHeight: 1.2
  }
});

export default errorStyle;
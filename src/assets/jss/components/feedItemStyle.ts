import { createStyles } from "@material-ui/core";

export default createStyles({
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  feedCard: {
    margin: "40px 0"
  },
  header: {
    display: "flex"
  },
  cardAvatar: {
    margin: "-50px 40px 0 0",
    maxWidth: "80px",
    maxHeight: "80px",
  },
  cardAvatarImg: {
    width: "80px",
    height: "80px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  footer: {
    flexWrap: "wrap",
  },
  fileCardBody: {
    marginTop: "40px"
  },
  feedItem: {
    display: "flex",
    justifyContent: "center"
  },
  collapse: {
    justifyContent: "center",
    marginTop: "30px"
  },
  personal: {
    marginTop: "-7px",
    "& span": {
      marginTop: "-7px",
      display: "block",
      fontSize: "14px",
    }
  }
})

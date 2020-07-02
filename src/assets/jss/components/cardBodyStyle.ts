import { createStyles } from "@material-ui/core";

const cardBodyStyle = createStyles({
  cardBody: {
    padding: "0.9375rem 20px",
    flex: "1 1 auto",
    WebkitBoxFlex: 1,
    position: "relative",
    minHeight: "121px"
  },
  cardBodyPlain: {
    paddingLeft: "5px",
    paddingRight: "5px"
  },
  cardBodyProfile: {
    marginTop: "15px"
  },
  underHover: {
    top: "-50px",
    left: "17px",
    right: "17px",
    width: "calc(100% - 30px)",
    position: "absolute",
    textAlign: "center"
  }
});

export default cardBodyStyle;

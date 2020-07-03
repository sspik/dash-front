import { createStyles } from "@material-ui/core";

const metricStyle = createStyles({
  chartControl: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  },
  chartPresets: {
    flex: "0 0 auto",
  },
  cartHeader: {
    display: "flex",
    flex: "1 1 auto"
  },
  cardHeaderFont: {
    fontSize: "12px"
  }
});

export default metricStyle;

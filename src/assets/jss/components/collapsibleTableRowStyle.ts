import { createStyles } from "@material-ui/core/styles";

const collapsibleTableRowStyle = createStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  tableCell: {
    paddingBottom: 0,
    paddingTop: 0
  }
});

export default collapsibleTableRowStyle;

import React, { FC, useState, Fragment } from 'react';
import { IGroupTask } from "interfaces";
import { makeStyles } from "@material-ui/core/styles";
import {
  IconButton,
  TableCell,
  TableRow,
  Collapse,
  Box,
  Typography,
  Tooltip, Fade,
} from "@material-ui/core";
import {
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@material-ui/icons";
import styles from "assets/jss/components/collapsibleTableRowStyle";
import styles2 from "assets/jss/components/tableTaskStyle";

interface ICollapsibleRowProps {
  task: IGroupTask
}

const useStyles = makeStyles({
  ...styles,
  ...styles2,
});

export const CollapsibleRow: FC<ICollapsibleRowProps> = (props) => {
  const classes = useStyles();
  const { task } = props;
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Fade
        in={true}
        timeout={200}
        addEndListener={() => null} // wtf
      >
        <TableRow className={classes.tableRow}>
          <TableCell className={classes.tableCell} align="left">
            <Tooltip
              title="Подробней"
              id="tooltip-top"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                className={classes.tableActionButton}
              >
                { open
                  ? <KeyboardArrowUpIcon
                      className={`${classes.tableActionButton} ${classes.edit}`}
                    />
                  : <KeyboardArrowDownIcon
                      className={`${classes.tableActionButton} ${classes.edit}`}
                   />
                }
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell className={classes.tableCell}>
            { task.TITLE }
          </TableCell>
        </TableRow>
      </Fade>

      <TableRow className={classes.tableRowCollapse}>
        <TableCell className={classes.tableCell} colSpan={2}>
          <Collapse
            addEndListener={() => null} // wtf
            in={open}
            timeout="auto"
            unmountOnExit
            collapsedHeight={0}
          >
            <Box margin={1}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
              >
                Описание задачи
              </Typography>
              <Typography
                variant="body2"
              >
                { task.DESCRIPTION }
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  )
}

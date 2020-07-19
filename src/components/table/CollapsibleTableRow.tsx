import React, { FC, useState } from 'react';
import moment from 'moment';
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
  KeyboardArrowRight as KeyboardArrowRightIcon,
} from "@material-ui/icons";
import { BBCode } from "components/BBcode/BBcode";
import styles from "assets/jss/components/collapsibleTableRowStyle";
import styles2 from "assets/jss/components/tableTaskStyle";
import { Link } from "react-router-dom";

import {
  ICollapsibleRowProps,
} from "./interfaces";

const useStyles = makeStyles({
  ...styles,
  ...styles2,
});

export const CollapsibleRow: FC<ICollapsibleRowProps> = (props) => {
  const classes = useStyles();
  const { task } = props;
  const [ open, setOpen ] = useState(false);
  return (
    <>
      <Fade
        in={true}
        timeout={200}
        addEndListener={() => null} // wtf
      >
        <TableRow className={classes.tableRow}>
          <TableCell
            className={classes.tableCell}
            padding="checkbox">
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
          <TableCell className={classes.tableCell}>
            { `${moment(task.CREATED_DATE).format('DD.MM.YYYY')}` }
          </TableCell>
          <TableCell className={classes.tableCell}>
            {
              task.DEADLINE.length
                ? `${ moment(task.DEADLINE).format('DD.MM.YYYY') }`
                : 'Не указан'
            }
          </TableCell>
          <TableCell className={classes.tableCell}>
            {
              task.CLOSED_DATE.length
                ? `${ moment(task.CLOSED_DATE).format('DD.MM.YYYY') }`
                : 'Открыта'
            }
          </TableCell>
          <TableCell className={classes.tableCell}>
            { `${task.CREATED_BY_NAME} ${task.CREATED_BY_LAST_NAME}` }
          </TableCell>
          <TableCell
            className={classes.tableCell}
            padding="checkbox"
          >
            <Tooltip
              title="Перейти к задаче"
              id="tooltip-right"
              placement="top"
              classes={{ tooltip: classes.tooltip }}
            >
              <Link to={`/dashboard/task/${task.ID}`}>
                <IconButton
                  size="small"
                  className={classes.tableActionButton}
                >
                  <KeyboardArrowRightIcon
                    className={`${classes.tableActionButton} ${classes.edit}`}
                  />
                </IconButton>
              </Link>
            </Tooltip>
          </TableCell>
        </TableRow>
      </Fade>

      <TableRow className={classes.tableRow + "Collapse"}>
        <TableCell className={classes.tableCell + "Collapse"} colSpan={6}>
          <Collapse
            addEndListener={() => null} // wtf
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <Box margin={1}>
              <Typography
                variant="body2"
              >
                <BBCode content={task.DESCRIPTION} />
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

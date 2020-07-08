import React, { FC, useState } from 'react';
import {
  makeStyles,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableHead,
  Typography,
} from "@material-ui/core";

import { TablePaginationActions } from "components/table/PaginationTable";
import {calcEmptyRows, metricNames} from "utils";

import styles from "assets/jss/components/tableTaskStyle";
import { IYandexMetrikaResponse } from "interfaces";

const useStyles = makeStyles(styles);

export const TableYandexMetrics: FC<IYandexMetrikaResponse> = (props) => {
  const classes = useStyles();
  const {
    data,
    query,
    time_intervals
  } = props.GetYandexMetrics;

  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(14);

  const emptyRows = calcEmptyRows(rowsPerPage, page, time_intervals.length)
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const headCols: string[] = query.dimensions.length
    ? data.map(dt => dt.dimensions.map(d => d.name).join(', '))
    : [metricNames[query.metrics[0]]];
  const tableTimes: string[] = time_intervals.map(time => time[0]);
  return (
    <Table
      stickyHeader
      className={classes.table}
      size="small"
    >
      <TableHead>
        <TableRow>
          <TableCell>Дата</TableCell>
          { headCols.map((col, index) => (
            <TableCell key={index} align="center">{ col }</TableCell>
          )) }
        </TableRow>
      </TableHead>
      <TableBody>
        { (rowsPerPage > 0
            ? tableTimes.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            : tableTimes
          ).map((time, timeIndex) => (
          <TableRow key={timeIndex} hover>
            <TableCell>{ time }</TableCell>
            { data.map(dt => dt.metrics.map((metric, metricIndex) => (
              <TableCell key={ metricIndex } align="center">
                { metric[tableTimes.indexOf(time)] }
              </TableCell>
            ))) }
          </TableRow>
        )) }
        { emptyRows > 0 && (
          <TableRow style={{ height: 33 * emptyRows }}>
            <TableCell colSpan={headCols.length + 1} />
          </TableRow>
        ) }
      </TableBody>
      <TableFooter>
        <TableRow className={classes.tableRow}>
          <TablePagination
            rowsPerPageOptions={[14, 30, 90, { label: 'Все', value: -1 }]}
            colSpan={headCols.length + 1}
            count={time_intervals.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'Дат на страницу' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  )
}

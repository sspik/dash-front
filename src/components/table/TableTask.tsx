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
} from "@material-ui/core";

import { TablePaginationActions } from "components/table/PaginationTable";
import { IGroupTask } from "interfaces";

import styles from "assets/jss/components/tableTaskStyle";
import { CollapsibleRow } from "./CollapsibleTableRow";
import {calcEmptyRows} from "../../utils";

const useStyles = makeStyles(styles);

interface ITableTaskProps {
  tasks: IGroupTask[];
}

export const TableTask: FC<ITableTaskProps> = (props) => {
  const classes = useStyles();
  const { tasks } = props;
  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(5);
  const emptyRows = calcEmptyRows(rowsPerPage, page, tasks.length)
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
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell> </TableCell>
          <TableCell>Название задачи</TableCell>
          <TableCell>Дата создания</TableCell>
          <TableCell>Крайний срок</TableCell>
          <TableCell>Дата выполнения</TableCell>
          <TableCell>Постановщик</TableCell>
          <TableCell> </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { (rowsPerPage > 0
            ? tasks.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            : tasks
          ).map( (task) => (
          <CollapsibleRow
            task={task}
            key={task.ID}
          />
        )) }
        { emptyRows > 0 && (
          <TableRow style={{ height: 44 * emptyRows }}>
            <TableCell colSpan={4} />
          </TableRow>
        ) }
      </TableBody>
      <TableFooter>
        <TableRow className={classes.tableRow}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'Все', value: -1 }]}
            colSpan={6}
            count={tasks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'задач на страницу' },
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

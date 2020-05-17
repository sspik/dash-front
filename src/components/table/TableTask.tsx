import React, { FC } from 'react';
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

const useStyles = makeStyles(styles);

interface ITableTaskProps {
  tasks: IGroupTask[];
}

export const TableTask: FC<ITableTaskProps> = (props) => {
  const classes = useStyles();
  const { tasks } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage);
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
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
          <TableCell>1</TableCell>
          <TableCell>2</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { (rowsPerPage > 0
            ? tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : tasks
          ).map( (task) => {
          return (
            <CollapsibleRow
              task={task}
              key={task.ID}
            />
          )
        }) }
        { emptyRows > 0 && (
          <TableRow style={{ height: 60 * emptyRows }}>
            <TableCell colSpan={2} />
          </TableRow>
        ) }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: 'Все', value: -1 }]}
            colSpan={2}
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

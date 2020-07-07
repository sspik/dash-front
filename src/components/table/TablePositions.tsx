import React, { FC, useState } from 'react';
import {
  makeStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell, TableFooter, TablePagination
} from "@material-ui/core";

import { ITopvisorResult } from 'interfaces';
import { calcEmptyRows } from "utils";
import { TablePaginationActions } from "./PaginationTable";
import styles from 'assets/jss/components/tableStyle';

const useStyles = makeStyles(styles);


export const TablePositions: FC<ITopvisorResult> = (props) => {
  const classes = useStyles();
  const { keywords } = props;

  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(50);
  const emptyRows = calcEmptyRows(rowsPerPage, page, keywords.length)
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
  const dates: Set<string> = new Set();
  keywords.forEach((keyword) => {
    keyword.positionsData
      && keyword.positionsData.forEach((position) => dates.add(position.data))
  });
  const datesArr = Array.from(dates);
  return (
    <Table size="small" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>
            Ключевое слово
          </TableCell>
          { datesArr.length
            ? datesArr.map((d, index) => (
                <TableCell align="center" key={index}>{ d }</TableCell>
            ))
            : <TableCell>За выбранный период позиции не снимались</TableCell>
          }
        </TableRow>
      </TableHead>
      <TableBody>
        { (rowsPerPage > 0
            ? keywords.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
            : keywords
          ).map((keyword, index) => (
          <TableRow key={index} hover>
            <TableCell>{ keyword.name }</TableCell>
            { datesArr
              ? datesArr.map((date, index) =>{
                const positionData = keyword.positionsData.filter(p => p.data === date);
                const position = positionData.length ? positionData[0].position : ''
                return (
                  <TableCell
                    key={date + index.toString()}
                    align="center"
                  >
                    { position }
                  </TableCell>
                )
              })
              : <TableCell key={index} />
            }
          </TableRow>
        )) }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[30, 60, 90, { label: 'Все', value: -1 }]}
            colSpan={datesArr.length + 1}
            count={keywords.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
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

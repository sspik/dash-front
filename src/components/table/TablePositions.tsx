import React, { FC, useState } from 'react';
import { v4 as uuid4 } from "uuid";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell, TableFooter, TablePagination
} from "@material-ui/core";

import { ITopvisorResult } from 'interfaces';
import { TablePaginationActions } from "./PaginationTable";

interface ITablePositionsProps extends ITopvisorResult {
  dates: string[];
}

export const TablePositions: FC<ITablePositionsProps> = (props) => {
  const { keywords, dates } = props;

  const [ page, setPage ] = useState(0);
  const [ rowsPerPage, setRowsPerPage ] = useState(30);
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
    <Table size="small" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>
            Ключевое слово
          </TableCell>
          { dates.length
            ? dates.map((d) => (
                <TableCell align="center" key={ uuid4() }>{ d }</TableCell>
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
          ).map((keyword) => (
          <TableRow key={ uuid4() } hover>
            <TableCell>{ keyword.name }</TableCell>
            { dates
              ? dates.map((date) =>{
                const positionData = keyword.positionsData.filter(p => p.data === date);
                const position = positionData.length ? positionData[0].position : ''
                return (
                  <TableCell
                    key={ uuid4() }
                    align="center"
                  >
                    { position }
                  </TableCell>
                )
              })
              : <TableCell key={ uuid4() } />
            }
          </TableRow>
        )) }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[30, 60, 90, { label: 'Все', value: -1 }]}
            colSpan={dates.length + 1}
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

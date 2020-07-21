import React, { FC, useState } from 'react';
import { v4 as uuid4 } from "uuid";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import { TablePaginationActions } from "./PaginationTable";

import {
  blackColor,
  dangerColor,
  successColor
} from "assets/jss/all";
import { ITablePositionsProps } from "./interfaces";


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
              ? dates.map((date, index) =>{
                const positionData = keyword.positionsData.filter(p => p.data === date);
                const position = positionData.length ? positionData[0].position : '';
                let prevPosition: number | string;
                try {
                  // Что бы не городить кучу условий, если позиции на выбранной дате не сущесвует
                  // просто предыдущую прировнять к текущей и та всё равно будет чёрной.
                  prevPosition = index !== 0
                    ? keyword.positionsData[keyword.positionsData.indexOf(positionData[0]) - 1].position
                    : positionData[0].position;
                } catch {
                  prevPosition = position;
                }
                const positionColor = prevPosition !== position
                  ? parseInt(position) > parseInt(prevPosition)
                    ? dangerColor[2]
                    : successColor[0]
                  : blackColor
                return (
                  <TableCell
                    key={ uuid4() }
                    align="center"
                    style={{
                      color: positionColor,
                    }}
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

import React, { FC } from 'react';
import { v4 as uuid4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell
} from "@material-ui/core";

import { ITableProps } from './interfaces'

import styles from 'assets/jss/components/tableStyle';

const useStyles = makeStyles(styles);


export const CustomTable: FC<ITableProps> = (props) => {
  const classes = useStyles() as any;
  const { tableHeaderColor, tableHead, tableData } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        { tableHead
          ? <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              { tableHead.map((prop) => {
                  return (
                    <TableCell
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      key={uuid4()}
                    >
                      { prop }
                    </TableCell>
                  );
              })}
            </TableRow>
          </TableHead>
          : null
        }
        <TableBody>
          { tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                { prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      { prop }
                    </TableCell>
                  );
                }) }
              </TableRow>
            );
          }) }
        </TableBody>
      </Table>
    </div>
  )
}

import {IGroupTask, iTableHeaderColor, ITopvisorResult} from "interfaces";
import React, { ReactNode } from "react";

export interface ICollapsibleRowProps {
  task: IGroupTask
}

export interface ITableTaskProps {
  tasks: IGroupTask[];
}

export interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

export interface ITableProps {
  tableHeaderColor: iTableHeaderColor;
  tableHead?: string[];
  tableData: Array<Array<ReactNode>>;
}

export interface ITablePositionsProps extends ITopvisorResult {
  dates: string[];
}
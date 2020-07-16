import { ChangeEvent } from "react";

export interface IPaginationProps {
  start: number;
  next?: number;
  total?: number;
  changePage?: (event: ChangeEvent<unknown>, page: number) => void;
}

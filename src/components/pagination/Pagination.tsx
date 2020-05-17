import React, { FC, ChangeEvent } from 'react';
import PaginationCore from '@material-ui/lab/Pagination';

interface IPaginationProps {
  start: number;
  next?: number;
  total?: number;
  changePage?: (event: ChangeEvent<unknown>, page: number) => void;
}


export const Pagination: FC<IPaginationProps> = (props) => {
  const { total, changePage, start } = props;
  const count = Math.ceil(total! / 50);
  const page = Math.ceil(start / 50) + 1;
  return (
    <PaginationCore
      count={count}
      onChange={changePage}
      page={page}
    />
  )
};

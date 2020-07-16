import React, { FC } from 'react';
import PaginationCore from '@material-ui/lab/Pagination';

import { IPaginationProps } from "./interfaces";

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

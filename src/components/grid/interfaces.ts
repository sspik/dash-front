import { ReactNode } from "react";
import { GridProps } from "@material-ui/core/Grid";

export interface IGridContainerProps extends GridProps {
  children?: ReactNode;
}

export interface IGridItemProps extends GridProps {
  children?: ReactNode;
  className?: string;
}
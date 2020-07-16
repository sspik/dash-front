import React, { ReactNode } from "react";
import { iInputColor } from "interfaces";

export interface IButtonProps {
  color: iInputColor;
  size?: "sm" | "lg";
  simple?: boolean;
  round?: boolean;
  disabled?: boolean;
  block?: boolean;
  link?: boolean;
  justIcon?: boolean;
  className?: string
  muiClasses?: object;
  href?: string;
  children?: ReactNode;
  variant?: "text" | "outlined" | "contained";
  component?: string;
  onClick?: (event: React.MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}
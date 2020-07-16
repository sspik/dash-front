import { ReactNode } from "react";
import { iCardHeaderColor } from "interfaces";

export interface ICardProps {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  chart?: boolean;
  hovered?: boolean;
  children: ReactNode;
}

export interface ICardAvatarProps {
  children: ReactNode;
  className?: string;
  profile?: boolean;
  plain?: boolean;
  [key: string]: any;
}

export interface ICardBodyProps {
  className?: string;
  plain?: string;
  profile?: boolean;
  children: ReactNode;
  underHover?: ReactNode;
  [key: string]: any;
}

export interface ICardFooterProps {
  className?: string;
  plain?: boolean;
  profile?: boolean;
  stats?: boolean;
  chart?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

export interface ICardHeaderProps {
  className?: string;
  color: iCardHeaderColor;
  plain?: boolean;
  stats?: boolean;
  icon?: boolean;
  hover?: string;
  children: ReactNode;
  [key: string]: any
}

export interface ICardIconProps {
  className?: string;
  color: iCardHeaderColor;
  children?: ReactNode;
  [key: string]: any;
}
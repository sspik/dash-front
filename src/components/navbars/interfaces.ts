import { IDashboardRoute, iHeaderColor } from "interfaces";

export interface IHeaderProps {
  color?: iHeaderColor;
  handleDrawerToggle: () => void;
  routes: Array<IDashboardRoute>;
  brand?: string;
}

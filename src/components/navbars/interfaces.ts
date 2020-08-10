import { IDashboardRoute, iHeaderColor } from "interfaces";
import * as H from 'history';

export interface IHeaderProps {
  color?: iHeaderColor;
  handleDrawerToggle: () => void;
  routes: Array<IDashboardRoute>;
  brand?: string;
  history?: H.History;
}

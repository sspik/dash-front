import { iBgColor, IDashboardRoute } from "interfaces";

export interface ISidebarProps {
  handleDrawerToggle: () => void;
  bgColor: iBgColor;
  color: iBgColor;
  logo: string;
  image?: string;
  logoText: string;
  routes: Array<IDashboardRoute>;
  open: boolean;
}
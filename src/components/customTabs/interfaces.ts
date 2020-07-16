import { ReactNode } from "react";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { SvgIconTypeMap } from "@material-ui/core";
import { iHeaderColor } from "interfaces";


export interface ICustomTabsProps {
  headerColor: iHeaderColor;
  title?: string;
  tabs: Array<{
    tabName: string;
    tabIcon?: OverridableComponent<SvgIconTypeMap>;
    tabContent: ReactNode;
  }>;
  plainTabs?: boolean;
  fullWidth?: boolean;
}
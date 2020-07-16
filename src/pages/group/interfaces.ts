import chartJs from "chart.js";
import { ChartData } from "react-chartjs-2";
import { IGroup, IGroupTask } from "interfaces";

export interface IGroupTaskGraphProps {
  data: ChartData<chartJs.ChartData>
}

export type iRouterParams = {
  groupId: string
}

export interface IQuery {
  GetGroupById: IGroup;
  GetGroupsTasks: IGroupTask[];
}
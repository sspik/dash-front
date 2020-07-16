import { RouteComponentProps } from "react-router";
import { ITopvisorPositions, ITopvisorSummaryChart } from "interfaces";

export type iRouterParams = {
  groupId: string
}

export interface IPositionProps extends RouteComponentProps<iRouterParams>{}
export interface IPositionsResponse {
  GetTopvisorPositions: ITopvisorPositions
}
export interface IPositionsVariables {
  bitrixGroupId: string;
  projectId?: string;
  regionIndexes?: number[];
  date1: string;
  date2: string;
}

export interface IPositionChartProps {
  dates: string[];
  projectId: string;
  bitrixGroupId: string;
  regionIndex: number;
}

export interface IPositionsChartVariables {
  bitrixGroupId: string;
  projectId: string;
  regionIndex: number;
  date1: string;
  date2: string;
}
export interface IPositionsChartResponse {
  GetTopvisorSummaryChart: { result: ITopvisorSummaryChart };
}
export interface IPositionsChartState {
  chartType: 'bar' | 'line';
}
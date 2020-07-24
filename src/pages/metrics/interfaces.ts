import { IYandexMetrikaResponse, TGraphType } from "interfaces";
import {RouteComponentProps} from "react-router";

type counterStatus = "Active" | "Deleted";
type counterPermission = "view" | "edit" | "own";
type counterCodeStatus = "CS_ERR_INFECTED" | "CS_ERR_OTHER_HTML_CODE"
  | "CS_NOT_FOUND" | "CS_ERR_CONNECT" | "CS_ERR_TIMEOUT" | "CS_OK";
type filterRobots = 0 | 1 | 2;


interface ICounterError {
  error_type: string;
  message: string
}

export type TMetricType = "search" | "direct";

export interface ICounter {
  id: string;
  status: counterStatus;
  owner_login: string;
  name: string;
  monitoring: { emails: string; phones: string; };
  mirrors: string[];
  errors?: ICounterError[];
  create_time: string;
  permission: counterPermission;
  code: string;
  code_status: counterCodeStatus;
  site: string;
  filter_robots: filterRobots;
  time_zone_name: string;
}

export interface IYandexMetrikaCounterResponse {
  GetCounter: ICounter;
}

export interface IYandexMetrikaCounterVariables {
  bitrixGroupId: string;
}

export interface IMetricsBase {
  metrics: string;
  dimensions?: string;
  date1: string;
  date2: string;
}

type TMetricVariable = {
  name: string;
  display: string;
  tooltip: string;
}
export interface IMetricsData {
  direct: {
    dimensions: { [key: string]: TMetricVariable },
    metrics: { [key: string]: TMetricVariable }
  };
  search: {
    dimensions: { [key: string]: TMetricVariable },
    metrics: { [key: string]: TMetricVariable }
  };
}

export interface IMetricsState extends IMetricsBase {
  graphType: TGraphType;
  metricType: TMetricType;
}

export interface IMetricsVariables {
  bitrixGroupId: string;
}

export interface IMetricsGraphProps {
  error?: Error;
  data?: IYandexMetrikaResponse;
  graphType: TGraphType;
}

type TRouterParams = {
  groupId: string
}
export interface IMetricsProps extends RouteComponentProps<TRouterParams>{}
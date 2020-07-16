import { IYandexMetrikaResponse, TGraphType } from "interfaces";

type counterStatus = "Active" | "Deleted";
type counterPermission = "view" | "edit" | "own";
type counterCodeStatus = "CS_ERR_INFECTED" | "CS_ERR_OTHER_HTML_CODE"
  | "CS_NOT_FOUND" | "CS_ERR_CONNECT" | "CS_ERR_TIMEOUT" | "CS_OK";
type filterRobots = 0 | 1 | 2;


interface ICounterError {
  error_type: string;
  message: string
}

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
  metrics?: string;
  dimensions?: string;
  preset?: string;
  date1: string;
  date2: string;
}

export interface IMetricsState extends IMetricsBase {
  graphType: TGraphType;
}

export interface IMetricsVariables {
  bitrixGroupId: string;
}

export interface IMetricsGraphProps {
  error?: Error;
  data?: IYandexMetrikaResponse;
  graphType: TGraphType;
}


import { ComponentClass, FunctionComponent } from 'react';
import { SvgIconTypeMap } from '@material-ui/core/';
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export type iBgColor = "purple" | "blue" | "green" | "orange" | "red";

type iBaseColors =  "primary" | "info" | "success" | "warning" | "danger";
export type iInputColor = iBaseColors | "rose" | "white" | "transparent";
export type iHeaderColor = iBaseColors;
export type iCardHeaderColor = iBaseColors | "rose" | "white";
export type iTableHeaderColor = iCardHeaderColor | "gray"

export interface IRoute {
  path: string;
  component: ComponentClass | FunctionComponent<any>;
  isPrivate: boolean;
}

export interface IDashboardRoute extends IRoute {
  name: string;
  layout: string;
  icon?: OverridableComponent<SvgIconTypeMap>;
  sidebar: boolean;
  exact?: boolean;
  isAdmin: boolean;
}

export interface IProfile {
  ID: iIdType;
  NAME: string;
  LAST_NAME: string;
  ADMIN: string;
}

type iGenderType = "M" | "F";

export interface IUser {
  ID: iIdType;
  ACTIVE: boolean;
  NAME: string;
  LAST_NAME: string;
  WORK_POSITION: string;
  SECOND_NAME: string;
  PERSONAL_GENDER: iGenderType;
  PERSONAL_PROFESSION: string;
  PERSONAL_WWW: string;
  PERSONAL_BIRTHDAY: string;
  PERSONAL_PHOTO: string;
  PERSONAL_ICQ: string;
  PERSONAL_PHONE: string;
  PERSONAL_MOBILE: string;
}

type iRoleUserForGroup = "A" | "E" | "K";
export type iIdType = string | number;

export interface IBitrixGroup {
  ID: iIdType;
  NAME: string;
  DESCRIPTION: string;
  OWNER_ID: iIdType;
  NUMBER_OF_MEMBERS: string;
}

export interface IWorkGroupsResponse {
  GetUserGroups: {
    next?: number;
    total: number;
    result: IBitrixGroup[];
  }
}

export interface IAttachment {
  ID: iIdType;
  OBJECT_ID: iIdType;
  CREATE_TIME: string;
  CREATED_BY: iIdType;
  DOWNLOAD_URL: string;
  NAME: string;
  SIZE: number;
}

export interface IFile {
  NAME: string;
  DOWNLOAD_URL: string;
  SIZE: number;
  DISK_TOKEN: string;
}

export interface IGroup {
  NAME: string;
  DESCRIPTION: string;
  DATE_CREATE: string;
  DATE_ACTIVITY: string
}

export interface IGroupTask {
  ID: iIdType;
  TITLE: string;
  DESCRIPTION: string;
  DEADLINE: string
  CREATED_DATE: string;
  CREATED_BY_NAME: string
  CREATED_BY_LAST_NAME: string
  STATUS: string
  DURATION_FACT: string;
  CLOSED_DATE: string;
}

interface IDimension {
  name: string;
  icon_id: string;
  icon_type: string;
  id: string;
}

export interface IYandexMetrika {
  dimensions: IDimension[];
  metrics: number[][];
}

interface IYandexMetrikaQuery  {
  ids: number[];
  dimensions: string[];
  metrics: string[];
  sort: string[];
  date1: string;
  date2: string;
  limit?: number;
  offset?: number;
  group?: string;
  auto_group_size?: string;
  quantile?: string;
  offline_window?: string;
  attribution?: string;
  currency?: string;
  adfox_event_id?: string;
}

export interface IYandexMetrikaResponse {
  GetYandexMetrics: {
    query: IYandexMetrikaQuery;
    data: IYandexMetrika[];
    time_intervals: [[string, string]];
    totals: [[number]];
  }
}
export type TGraphType = "line" | "pie";

interface ITopvisorRegion {
  searcher_key: number;
  id: string;
  key: number;
  lang: string;
  devise: number;
  depth: number;
  index: number;
  enabled: number;
  type: string;
  countryCode: string;
  name: string;
  areaName: string;
  domain: string;
}

interface ITopvisorSearcher {
  id: string;
  project_id: string;
  searcher: number;
  enabled: number;
  ord: number;
  key: number;
  name: string;
  regions: ITopvisorRegion[];
}

export interface ITopVisorProject {
  id: string;
  name: string;
  searchers: ITopvisorSearcher[];
}

export type TPosition = {
  data: string;
  regionIndex: number;
  position: string;
}

export interface IKeyword {
  name: string;
  positionsData: TPosition[];
}

export interface ITopvisorResult {
  keywords: IKeyword[];
}

export interface ITopvisorPositions {
  result: ITopvisorResult;
}

type TTopvisorTops =  {
  all: number[],
  top3: number[],
  top10: number[],
  top11_30: number[],
  top31_50: number[],
  top51_100: number[],
  top101_10000: number[],
  [key: string]: number[],
}

export interface ITopvisorSummaryChart {
  tops: TTopvisorTops,
  avg: number[],
  dates: string[],
}

export interface IAttachedFile {
  name: string;
  path: string;
  size: number;
  type: string;
}

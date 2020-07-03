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
export interface ISearchGroupResponse {
  SearchGroupByName: IBitrixGroup[];
}


export interface IWorkGroupsResponse {
  GetUserGroups: {
    next?: number;
    total: number;
    result: IBitrixGroup[];
  }
}
export interface IFeed {
  ID: iIdType;
  AUTHOR: IUser;
  DETAIL_TEXT: string;
  DATE_PUBLISH: string;
  FILES?: IAttachment[];
}
export interface IFeedResponse {
  GetFeed: {
    next?: number;
    total: number;
    result: IFeed[];
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

export interface IAttachmentResponse {
  result: IAttachment;
}

export interface IFile {
  NAME: string;
  DOWNLOAD_URL: string;
  SIZE: number;
  DISK_TOKEN: string;
}

export interface IFileResponse {
  result: IFile
}

export interface IBatchRequest {
  [key: string]: string
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

type iShortTaskUser = {
  id: string;
  name: string;
  link: string;
  icon?: string;
}

enum Duration {
  days,
  hours,
  minutes,
}

enum TaskPriority {
  low,
  middle,
  high
}

export interface ITaskDetail {
  id: string;
  title: string;
  description: string;
  deadline: string;
  startDatePlan: string;
  endDatePlan: string;
  priority: TaskPriority;
  responsible: iShortTaskUser;
  creator: iShortTaskUser;
  status: number;
  dateStart: string;
  durationFact: number;
  durationPlan: number;
  durationType: Duration;
  createdDate: string;
  closedDate: string;
  files: IAttachment[];
}

export interface ITaskMessage {
  POST_MESSAGE_HTML: string;
  ID: string;
  AUTHOR: IUser;
  AUTHOR_ID: string;
  POST_DATE: string;
  POST_MESSAGE: string;
  FILES: IAttachment[];
}
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

interface IYandexMetrikaQuery  {
  ids: number[];
  dimensions: string[];
  metrics: string[];
  sort: string[];
  date1: string;
  date2: string;
  limit?: number;
  offcet?: number;
  group?: string;
  auto_group_size?: string;
  quantile?: string;
  offline_window?: string;
  attribution?: string;
  currency?: string;
  adfox_event_id?: string;
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

export interface IYandexMetrikaResponse {
  GetYandexMetrics: {
    query: IYandexMetrikaQuery,
    data: IYandexMetrika[],
    time_intervals: [[string, string]]
    totals: [[number]]
  }
}

export type TGraphType = "line" | "pie";

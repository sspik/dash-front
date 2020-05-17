import { ComponentClass, FunctionComponent } from 'react';
import { SvgIconTypeMap } from '@material-ui/core/';
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

export type iBgColor = "purple" | "blue" | "green" | "orange" | "red";

type iBaseColors =  "primary" | "info" | "success" | "warning" | "danger";
export type iInputColor = iBaseColors | "rose" | "white" | "transparent";
export type iHeaderColor = iBaseColors;
export type iCardHeaderColor = iBaseColors | "rose";
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


import { iIdType } from "interfaces";

export interface IAttachment {
  ID: iIdType;
  OBJECT_ID: iIdType;
  CREATE_TIME: string;
  CREATED_BY: iIdType;
  DOWNLOAD_URL: string;
  NAME: string;
  SIZE: number;
}

export interface IIconProps {
  fileType: string;
  downloadUrl: string;
  name: string;
}
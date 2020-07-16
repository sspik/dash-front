import { IAttachment, iIdType, IUser} from "interfaces";

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

export interface ISendFeedResponse {
  SendFeedMessage: {
    result: boolean;
  }
}

export interface IFeedProps {
  filter?: string[];
  showMessageFor?: string[];
}

export interface IFeedState {
  title: string;
  message: string;
  files: File[];
  start: number;
}

export interface ISendFeedVariables {
  message?: string,
  title: string,
  files?: File[],
  showFor?: string[]
}

export interface IGetFeedVariables {
  start: number;
  filter?: string[];
}

export interface IFeedListProps {
  next?: number;
  total: number;
  result: IFeed[];
}
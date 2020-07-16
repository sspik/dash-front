import { RouteComponentProps } from "react-router-dom";
import {IAttachment, IUser} from "interfaces";

export type TRouteParams = {
  taskId: string;
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

type iShortTaskUser = {
  id: string;
  name: string;
  link: string;
  icon?: string;
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
export interface ITaskDetailProps extends RouteComponentProps<TRouteParams>{}
export interface ITaskDetailState {
  message: string;
}
export interface ITaskData {
  GetTaskByID: ITaskDetail;
  GetTaskComments: ITaskMessage[];
}
export interface IAddTaskMessageVariables {
  taskId: string;
  message: string;
}

export interface IAddTaskMessageResponse {
  SendTaskMessage: {
    error?: string;
    error_message?: string;
    result?: string;
  }
}
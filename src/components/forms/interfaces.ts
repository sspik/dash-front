import { ChangeEvent } from "react";
import { ApolloError } from "apollo-client";

export interface IPostMessageProps {
  title?: string;
  message: string;
  loading: boolean;
  handleSendMessage: () => void;
  handleChangeInput: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  sendFeedError?: ApolloError;
}
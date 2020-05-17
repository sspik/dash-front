import React, { FC, Fragment } from 'react';
import { FeedItem } from "./FeedItem";
import { IFeed } from "interfaces";

interface IFeedListProps {
  next?: number;
  total: number;
  result: IFeed[];
}

export const FeedList: FC<IFeedListProps> = (props) => {
  return (
    <Fragment>
      {
        props.result.map(feed =>
          <FeedItem key={ feed.ID } { ...feed } />
        )
      }
    </Fragment>
  )
};

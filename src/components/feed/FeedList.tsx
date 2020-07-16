import React, { FC, useMemo } from 'react';
import { FeedItem } from "./FeedItem";
import { IFeedListProps } from "./interfaces";

export const FeedList: FC<IFeedListProps> = (props) => useMemo(() => (
  <>
    {
      props.result.map(feed =>
        <FeedItem key={ feed.ID } { ...feed } />
      )
    }
  </>
), [props.result])

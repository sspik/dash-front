import React, { FC } from 'react';
import { Helmet } from "react-helmet";
import { FeedContainer } from "components/feed/FeedContainer";

const Feed: FC = () => {
  return (
    <>
      <Helmet>
        <title>Живая лента</title>
      </Helmet>
      <FeedContainer />
    </>
  )
};

export default Feed;
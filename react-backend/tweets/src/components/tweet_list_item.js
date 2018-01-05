import React from "react";
import { Tweet } from 'react-twitter-widgets'

const TweetListItem = ({ id }) => {
  return (
    <li className="list-group-item">
      <Tweet tweetId={id}></Tweet>
    </li>
  );
};

export default TweetListItem;
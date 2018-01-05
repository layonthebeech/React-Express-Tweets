import React from 'react';
import TweetListItem from "./tweet_list_item";
import './tweet_list.css';

const TweetList = props => {
  const tweetItems = props.tweets.map(tweet => {

    return (
      <TweetListItem
        key={tweet.id_str}
        id={tweet.id_str}
      />
    );
  });

  return (
    <div> 
      <ul className="col-md-12 list">
        <h1 className="userName">
          {props.user}
        </h1>
        <div className="tweets">
          {tweetItems}
        </div>
      </ul>
    </div>
  );
};

export default TweetList;

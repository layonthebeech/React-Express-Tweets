import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchBar from "./components/search_bar";
import AutoFillSearchBar from "./components/autofill_search_bar";
import TweetList from './components/tweet_list';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected_user: '',
      tweets: []
    };
  }
  selectUser = (user) => {
    this.setState({ 
      selected_user:user 
    },this.getUserTweets(user));
    
  }
  getUserTweets = query => {
    fetch('/api/getTweets', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: query,
      }),
    }).then(res => res.json())
    .then(tweets => {
      console.log('tweets', tweets)
      this.setState({ tweets:tweets })
    });
  }
  render() {
    return (
      <div className="App">
        <AutoFillSearchBar onUserSelect={this.selectUser}/>
        <TweetList user={this.state.selected_user} tweets={this.state.tweets}/>
      </div>
     
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
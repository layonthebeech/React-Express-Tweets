import Autosuggest from 'react-autosuggest';
import React from 'react';
import theme from './theme.js';

console.log(theme)
const renderSuggestion = suggestion => (
  <div>
    {suggestion.screen_name}
  </div>
);

class AutoFillSearchBar extends React.Component {
  constructor(props) {
    super(props);
    //console.log(props.users)
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
    };
    
  }
  getSuggestionValue = suggestion => { return suggestion.screen_name };
  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log(suggestion.screen_name)
    console.log(this.props)
    this.props.onUserSelect(suggestion.screen_name);
  }
  twitterSearch = term => {
    fetch('/api/searchUsers', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: term,
      }),
    }).then(res => res.json())
    .then(users => {
      console.log('users', users)
      this.setState({ suggestions:users })
      });;
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
      this.twitterSearch(value)
    this.setState({
      suggestions: this.state.suggestions
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions, selected_user } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a twitter account',
      value,
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <Autosuggest theme= {theme}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AutoFillSearchBar;
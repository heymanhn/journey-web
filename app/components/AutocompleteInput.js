'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';

class AutocompleteInput extends Component {
  render() {
    const {
      input,
      onClearAutocomplete,
      onQueryAutocomplete,
      onSaveInput,
      placeholder,
      results
    } = this.props;

    let inputProps = {
      placeholder,
      onChange: onSaveInput,
      type: 'text',
      value: input
    };

    return (
      <Autosuggest
        suggestions={results}
        onSuggestionsFetchRequested={onQueryAutocomplete}
        onSuggestionsClearRequested={onClearAutocomplete}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={this.loadStyle.bind(this)()}
      />
    );
  }

  loadStyle() {
    const { results, style } = this.props;
    const baseStyle = { ...styles };

    if (results.length > 0) {
      baseStyle.suggestionsContainer.display = "block";
      baseStyle.input.borderBottomLeftRadius = 0;
      baseStyle.input.borderBottomRightRadius = 0;
    } else {
      baseStyle.suggestionsContainer.display = "none";
      baseStyle.input.borderBottomLeftRadius = 4;
      baseStyle.input.borderBottomRightRadius = 4;
    }

    if (style) {
      _.extend(baseStyle.input, style);
      _.extend(baseStyle.suggestionsContainer, style);
    }

    return baseStyle;
  }
}

function getSuggestionValue(suggestion) {
  return suggestion.description;
}

function renderSuggestion(suggestion) {
  return (
    <div>
      {suggestion.description}
    </div>
  );
}

AutocompleteInput.propTypes = {
  onClearAutocomplete: PropTypes.func.isRequired,
  error: PropTypes.string,
  results: PropTypes.array,
  onQueryAutocomplete: PropTypes.func.isRequired,
  onSaveInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.object
};

const styles = {
  input: {
    border: "1px solid #cccccc",
    borderRadius: "4px",
    color: "#666",
    fontSize: 16,
    margin: 5,
    outline: "none",
    padding: "6px 12px"
  },
  suggestionsContainer: {
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    display: "none",
    left: 5,
    marginTop: -6,
    position: "absolute",
    zIndex: 2
  }
}

export default AutocompleteInput;

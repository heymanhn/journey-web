'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { colors } from 'app/constants';

class AutocompleteInput extends Component {
  render() {
    const {
      input,
      onClearAutocomplete,
      onQueryAutocomplete,
      onSaveDestination,
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
        onSuggestionSelected={onSaveDestination}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={this.loadStyle.bind(this)()}
      />
    );
  }

  loadStyle() {
    const { results, style } = this.props;
    const baseStyle = { ...autocompleteStyles };

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

function renderSuggestion(suggestion, { query }) {
  const { description } = suggestion;
  const matches = match(description, query);
  const parts = parse(description, matches);

  const suggestionParts = parts.map((part, index) => {
    return (
      <span
        key={index}
        style={part.highlight ? styles.suggestionMatch : {}}
      >
        {part.text}
      </span>
    );
  });

  return (
    <div>
      <span style={styles.suggestionText}>{suggestionParts}</span>
    </div>
  );
}

AutocompleteInput.propTypes = {
  onClearAutocomplete: PropTypes.func.isRequired,
  error: PropTypes.string,
  results: PropTypes.array,
  onQueryAutocomplete: PropTypes.func.isRequired,
  onSaveDestination: PropTypes.func.isRequired,
  onSaveInput: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  style: PropTypes.object
};

const autocompleteStyles = {
  input: {
    border: "1px solid #cccccc",
    borderRadius: "4px",
    color: "#333333",
    fontSize: 16,
    margin: 5,
    outline: "none",
    padding: "6px 12px"
  },
  suggestion: {
    alignItems: "center",
    backgroundImage: "url('../assets/setting-marker-icon.png')",
    backgroundPosition: "12px 12px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "12px 16px",
    borderTop: "1px solid #cccccc",
    color: "#333333",
    cursor: "pointer",
    display: "flex",
    padding: "10px 5px"
  },
  suggestionFocused: {
    backgroundColor: "#f4f4f4",
    backgroundImage: "url('../assets/mini-marker-icon.png')"
  },
  suggestionsList: {
    listStyleType: "none",
    margin: 0,
    padding: 0
  },
  suggestionsContainer: {
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    borderTop: 0,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    display: "none",
    left: 5,
    marginTop: -6,
    position: "absolute",
    zIndex: 2
  }
};

const styles = {
  suggestionMatch: {
    color: colors.secondary,
    fontWeight: 500
  },
  suggestionText: {
    marginLeft: 30
  }
}

export default AutocompleteInput;

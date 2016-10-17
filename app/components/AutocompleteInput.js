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
      placeSelected,
      placeholder,
      results
    } = this.props;

    let inputProps = {
      onChange: onSaveInput,
      onKeyDown: this.handleKeyPress.bind(this),
      placeholder,
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
    const { placeSelected, results, style } = this.props;
    const { input, suggestionsContainer: sc } = styles;
    const baseStyle = { ...autocompleteStyles };

    // Display the autocomplete container once there are results
    if (results.length > 0) {
      _.extend(baseStyle.suggestionsContainer, sc.results);
      _.extend(baseStyle.input, input.results);
    } else {
      _.extend(baseStyle.suggestionsContainer, sc.noResults);
      _.extend(baseStyle.input, input.noResults);
    }

    // Incorporate additional styles from the user of this component
    if (style) {
      _.extend(baseStyle.input, style);
      _.extend(baseStyle.suggestionsContainer, style);
    }

    // Show markers next to text when a place has been selected
    if (placeSelected) {
      _.extend(baseStyle.input, input.placeSelected);
    } else {
      _.extend(baseStyle.input, input.noPlace);
    }

    return baseStyle;
  }

  handleKeyPress(event) {
    const { onClearSavedDest, onSaveInput, placeSelected } = this.props;

    switch(event.key) {
      case 'Backspace':
        if (placeSelected) {
          onSaveInput(null, { newValue: '' });
          return onClearSavedDest();
        } else {
          return null;
        }
      case 'Escape':
        return placeSelected && onClearSavedDest();
    }
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
  error: PropTypes.string,
  onClearAutocomplete: PropTypes.func.isRequired,
  onClearSavedDest: PropTypes.func.isRequired,
  onQueryAutocomplete: PropTypes.func.isRequired,
  onSaveDestination: PropTypes.func.isRequired,
  onSaveInput: PropTypes.func.isRequired,
  placeSelected: PropTypes.bool,
  placeholder: PropTypes.string,
  results: PropTypes.array,
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
    left: 5,
    marginTop: -6,
    position: "absolute",
    zIndex: 2
  }
};

const styles = {
  input: {
    noPlace: {
      paddingLeft: 12,
      backgroundImage: "none"
    },
    noResults: {
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4
    },
    placeSelected: {
      paddingLeft: 35,
      backgroundImage: "url('../assets/mini-marker-icon.png')",
      backgroundPosition: "12px 9px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "12px 16px"
    },
    results: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }
  },
  inputIcon: {
    height: 16,
    marginLeft: 17,
    marginTop: 13,
    position: "absolute",
    width: 12
  },
  suggestionMatch: {
    color: colors.secondary,
    fontWeight: 500
  },
  suggestionsContainer: {
    noResults: {
      display: "none"
    },
    results: {
      display: "block"
    }
  },
  suggestionText: {
    marginLeft: 30
  }
}

export default AutocompleteInput;

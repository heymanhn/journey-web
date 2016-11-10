'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { colors } from 'app/constants';

class AutocompleteInput extends Component {
  componentDidMount() {
    const { defaultValue, onSetDefaultPlace } = this.props;

    if (defaultValue) {
      onSetDefaultPlace(defaultValue);
    }
  }

  render() {
    const {
      autoFocus,
      id,
      input,
      onClearAutocomplete,
      onQueryAutocomplete,
      onSavePlace,
      onSaveInput,
      placeSelected,
      placeholder,
      results,
      tabIndex
    } = this.props;

    let inputProps = {
      autoFocus,
      onChange: onSaveInput,
      onKeyDown: this.handleKeyPress.bind(this),
      placeholder,
      tabIndex,
      type: 'text',
      value: input
    };

    return (
      <Autosuggest
        id={id}
        suggestions={results}
        onSuggestionsFetchRequested={onQueryAutocomplete}
        onSuggestionsClearRequested={onClearAutocomplete}
        onSuggestionSelected={onSavePlace}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        theme={this.loadStyle()}
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
    } else {
      _.extend(baseStyle.suggestionsContainer, sc.noResults);
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
    const { onClearSavedPlace, onSaveInput, placeSelected } = this.props;

    switch(event.key) {
      case 'Backspace':
        if (placeSelected) {
          onSaveInput(null, { newValue: '' });
          return onClearSavedPlace();
        } else {
          return null;
        }
      case 'Escape':
        return placeSelected && onClearSavedPlace();
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
      <div style={styles.suggestionText}>{suggestionParts}</div>
    </div>
  );
}

AutocompleteInput.propTypes = {
  autoFocus: PropTypes.bool,
  defaultValue: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  onClearAutocomplete: PropTypes.func.isRequired,
  onClearSavedPlace: PropTypes.func.isRequired,
  onQueryAutocomplete: PropTypes.func.isRequired,
  onSavePlace: PropTypes.func.isRequired,
  onSaveInput: PropTypes.func.isRequired,
  onSetDefaultPlace: PropTypes.func.isRequired,
  placeSelected: PropTypes.bool,
  placeholder: PropTypes.string,
  results: PropTypes.array,
  style: PropTypes.object,
  tabIndex: PropTypes.number
};

const autocompleteStyles = {
  container: {
    margin: "5px 0px"
  },
  input: {
    border: "1px solid #cccccc",
    color: colors.primaryText,
    fontSize: 14,
    height: 36,
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
    color: colors.primaryText,
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
    marginTop: -1,
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
    placeSelected: {
      paddingLeft: 30,
      backgroundImage: "url('../assets/mini-marker-icon.png')",
      backgroundPosition: "10px 50%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "12px 16px"
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

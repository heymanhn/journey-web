'use strict';

import { connect } from 'react-redux';
import {
  clearAutocomplete,
  apiAutocompleteDest,
  saveInput
} from 'app/actions/search';
import { apiCreateTripSaveDest } from 'app/actions/trips';
import AutocompleteInput from 'app/components/AutocompleteInput';

const mapStateToProps = (state) => {
  const { error, input, results } = state.searchState;
  return {
    error,
    input,
    results
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearAutocomplete() {
      dispatch(clearAutocomplete());
    },

    onSaveDestination(event, { suggestion, suggestionValue }) {
      dispatch(apiCreateTripSaveDest(suggestion.place_id));
    },

    onQueryAutocomplete({ value }) {
      dispatch(apiAutocompleteDest(value));
    },

    onSaveInput(event, { newValue }) {
      dispatch(saveInput(newValue));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteInput);

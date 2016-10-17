'use strict';

import { connect } from 'react-redux';
import {
  clearAutocomplete,
  apiAutocompleteDest,
  saveInput
} from 'app/actions/autocomplete';
import { apiCreateTripSaveDest, clearSavedDest } from 'app/actions/trips';
import AutocompleteInput from 'app/components/AutocompleteInput';

const mapStateToProps = (state) => {
  const {
    error,
    input,
    placeSelected,
    results
  } = state.componentsState.autocompleteState;

  return {
    error,
    input,
    placeSelected,
    results
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearAutocomplete() {
      dispatch(clearAutocomplete());
    },

    onClearSavedDest() {
      dispatch(clearSavedDest());
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

'use strict';

import { connect } from 'react-redux';
import {
  clearAutocomplete,
  apiAutocompleteDest,
  saveInput
} from 'app/actions/search';
import { apiCreateTripSaveDest, clearSavedDest } from 'app/actions/trips';
import PlaceAutocompleteInput from 'app/components/PlaceAutocompleteInput';

const mapStateToProps = (state) => {
  const { error, input, place, results } = state.searchState;
  return {
    error,
    input,
    place,
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
)(PlaceAutocompleteInput);

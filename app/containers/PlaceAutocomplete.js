'use strict';

import { connect } from 'react-redux';
import {
  clearAutocomplete,
  apiAutocompleteDest,
  saveInput
} from 'app/actions/autocomplete';
import { apiCreateTripSaveDest, clearSavedDest } from 'app/actions/trips';
import AutocompleteInput from 'app/components/AutocompleteInput';

const mapStateToProps = (state, ownProps) => {
  const {
    error,
    input,
    placeSelected,
    results
  } = state.componentsState.autocompleteState[ownProps.id];

  return {
    error,
    input,
    placeSelected,
    results
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { id } = ownProps;

  return {
    onClearAutocomplete() {
      dispatch(clearAutocomplete(id));
    },

    onClearSavedDest() {
      dispatch(clearSavedDest(id));
    },

    onSaveDestination(event, { suggestion, suggestionValue }) {
      dispatch(apiCreateTripSaveDest(id, suggestion.place_id));
    },

    onQueryAutocomplete({ value }) {
      dispatch(apiAutocompleteDest(id, value));
    },

    onSaveInput(event, { newValue }) {
      dispatch(saveInput(id, newValue));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteInput);

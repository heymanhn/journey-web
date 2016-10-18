'use strict';

import { connect } from 'react-redux';
import {
  apiAutocomplete,
  apiFetchPlaceDetails,
  clearAutocomplete,
  clearSavedPlace,
  saveInput,
  setDefaultPlace
} from 'app/actions/autocomplete';
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

    onClearSavedPlace() {
      dispatch(clearSavedPlace(id));
    },

    onQueryAutocomplete({ value }) {
      dispatch(apiAutocomplete(id, value));
    },

    onSaveInput(event, { newValue }) {
      dispatch(saveInput(id, newValue));
    },

    onSavePlace(event, { suggestion, suggestionValue }) {
      dispatch(apiFetchPlaceDetails(id, suggestion.place_id));
    },

    onSetDefaultPlace(placeName) {
      dispatch(setDefaultPlace(id, placeName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AutocompleteInput);

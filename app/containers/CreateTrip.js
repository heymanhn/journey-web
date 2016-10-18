'use strict';

import { connect } from 'react-redux';
import {
  apiCreateTrip,
  createTripSaveDest,
  createTripSaveTitle,
  createTripSaveVisibility
} from 'app/actions/trips';
import CreateTripPage from 'app/components/CreateTripPage';
import { apiAutocompleteDest } from 'app/actions/autocomplete';

const mapStateToProps = (state) => {
  const { error } = state.tripsState;
  return {
    error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateTripPress() {
      dispatch(apiCreateTrip());
    },

    onEnterTitle(event) {
      dispatch(createTripSaveTitle(event.target.value));
    },

    onEnterDestination(place) {
      dispatch(createTripSaveDest(place));
    },

    onQueryAutocomplete(event) {
      const { selectionEnd: offset, value: input } = event.target;
      dispatch(apiAutocompleteDest(input, offset));
    },

    onSetVisibility(event) {
      dispatch(createTripSaveVisibility(event.target.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripPage);

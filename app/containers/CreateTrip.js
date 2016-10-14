'use strict';

import { connect } from 'react-redux';
import {
  apiCreateTrip,
  createTripSaveDest,
  createTripSaveTitle,
  createTripSaveVisibility
} from 'app/actions/trips';
import CreateTripPage from 'app/components/CreateTripPage';
import { apiAutocompleteDest } from 'app/actions/search';

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
      dispatch(apiAutocompleteDest(event.target.value));
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

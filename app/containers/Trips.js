'use strict';

import { connect } from 'react-redux';
import { apiPageEvent, apiTrackEvent } from 'app/actions/analytics';
import { showModal, hideModal } from 'app/actions/modals';
import {
  apiDeleteTrip,
  apiGetTrips,
  clearTripsError,
  saveNewTripVisibility
} from 'app/actions/trips';
import TripsPage from 'app/components/TripsPage';
import { analytics, modalComponents } from 'app/constants';
const { deleteTrip, tripSettings } = modalComponents;

const mapStateToProps = (state) => {
  const { error, isFetching, trips, tripToDelete } = state.tripsState;
  const { showModal } = state.componentsState.modalsState.deleteTrip;
  return {
    error,
    isFetching,
    showModal,
    trips,
    tripToDelete
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateTripPress() {
      dispatch(clearTripsError());
      dispatch(showModal(tripSettings));

      // Set default visibility if creating a new trip
      dispatch(saveNewTripVisibility('public'));
    },

    onDeleteTrip() {
      dispatch(apiDeleteTrip());
    },

    onGetTrips() {
      dispatch(apiGetTrips());
    },

    onHide() {
      dispatch(hideModal(deleteTrip));
    },

    trackPageView() {
      dispatch(apiPageEvent(analytics.pages.TRIPS_PAGE));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsPage);

'use strict';

import { connect } from 'react-redux';
import { apiPageEvent, apiTrackEvent } from 'app/actions/analytics';
import { showModal } from 'app/actions/modals';
import {
  apiDeleteTrip,
  clearTripsError,
  saveNewTripVisibility
} from 'app/actions/trips';
import TripsPage from 'app/components/TripsPage';
import { analytics, modalComponents } from 'app/constants';

const mapStateToProps = (state) => {
  return {
    trips: state.tripsState.trips,
    user: state.authState.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateTripPress() {
      dispatch(clearTripsError());
      dispatch(showModal(modalComponents.tripSettings));

      // Set default visibility if creating a new trip
      dispatch(saveNewTripVisibility('public'));
    },

    onDeleteTripPress(tripId) {
      dispatch(apiDeleteTrip(tripId));
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

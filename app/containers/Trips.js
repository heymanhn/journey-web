'use strict';

import { connect } from 'react-redux';
import { apiPageEvent, apiTrackEvent } from '../actions/analytics';
import { apiDeleteTrip, apiGetTrip, clearTripsError } from '../actions/trips';
import { processLogout } from '../actions/auth';
import { createTrip, viewTripPage } from '../actions/navigation';
import TripsPage from '../components/TripsPage';
import { analytics } from '../constants';

const mapStateToProps = (state) => {
  return {
    name: state.authState.user.name,
    trips: state.tripsState.trips
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateTripPress() {
      dispatch(clearTripsError());
      createTrip();
    },

    onDeleteTripPress(tripId) {
      dispatch(apiDeleteTrip(tripId));
    },

    onLogoutPress() {
      dispatch(apiTrackEvent(analytics.events.LOG_OUT));
      dispatch(processLogout());
    },

    onViewTrip(tripId) {
      dispatch(apiGetTrip(tripId));
      viewTripPage(tripId);
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

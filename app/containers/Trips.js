'use strict';

import { connect } from 'react-redux';
import { apiPageEvent, apiTrackEvent } from 'app/actions/analytics';
import { apiDeleteTrip, apiGetTrip, clearTripsError } from 'app/actions/trips';
import { processLogout } from 'app/actions/auth';
import { createTrip, viewTripPage } from 'app/actions/navigation';
import TripsPage from 'app/components/TripsPage';
import { analytics } from 'app/constants';

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

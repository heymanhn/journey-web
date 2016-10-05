'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import { viewTripsPage } from 'app/actions/navigation';
import { apiGetTrip } from 'app/actions/trips';
import { analytics } from 'app/constants';
import TripPage from 'app/components/TripPage';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    error: ts.error ? ts.error : '',
    trip: ts.trip
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { tripId } = props.params;
  return {
    onGetTrip() {
      dispatch(apiGetTrip(tripId));
    },

    onViewTrips() {
      dispatch(viewTripsPage());
    },

    trackPageView() {
      dispatch(apiTripPageEvent(analytics.pages.TRIP_PAGE, { tripId } ));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPage);

'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import { apiGetTrip } from 'app/actions/trips';
import { analytics } from 'app/constants';
import TripPage from 'app/components/TripPage';

const mapStateToProps = (state) => {
  const { error, trip } = state.tripState;
  return {
    error,
    trip
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { tripId } = props.params;
  return {
    onGetTrip() {
      dispatch(apiGetTrip(tripId));
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

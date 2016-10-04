'use strict';

import { connect } from 'react-redux';
import { apiPageEvent } from '../actions/analytics';
import { apiGetTrip } from '../actions/trips';
import { analytics } from '../constants';
import TripPage from '../components/TripPage';

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

    trackPageView() {
      dispatch(apiPageEvent(analytics.pages.TRIP_PAGE, undefined, { tripId }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPage);

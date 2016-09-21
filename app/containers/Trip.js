'use strict';

import { connect } from 'react-redux';
import { apiGetTrip } from '../actions/trips';
import TripPage from '../components/TripPage';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    error: ts.error ? ts.error : '',
    trip: ts.trip
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetTrip: (tripId) => {
      dispatch(apiGetTrip(tripId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPage);

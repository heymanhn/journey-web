'use strict';

import { connect } from 'react-redux';
import {
  apiGetTrip,
  apiGetTripFailure,
  clearTripsError
} from '../actions/actions';
import TripPage from '../components/TripPage';

const mapStateToProps = (state) => {
  return {
    error: state.tripsState.tripError ? state.tripsState.tripError : '',
    trip: state.tripsState.trip,
    trips: state.tripsState.trips
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearTripsError: () => {
      dispatch(clearTripsError());
    },
    onGetTrip: (tripId) => {
      dispatch(apiGetTrip(tripId));
    },
    onNoTripFound: () => {
      dispatch(apiGetTripFailure('Trip not found'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPage);

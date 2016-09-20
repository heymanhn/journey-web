'use strict';

import { connect } from 'react-redux';
import {
  apiGetTrip
} from '../actions/actions';
import TripPage from '../components/TripPage';

const mapStateToProps = (state) => {
  return {
    error: state.tripState.error ? state.tripState.error : '',
    trip: state.tripState.trip
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

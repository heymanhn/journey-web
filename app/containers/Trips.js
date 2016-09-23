'use strict';

import { connect } from 'react-redux';
import { apiGetTrip, apiDeleteTrip, clearTripsError } from '../actions/trips';
import { logout } from '../actions/auth';
import { createTrip, viewTripPage } from '../actions/navigation';
import TripsPage from '../components/TripsPage';

const mapStateToProps = (state) => {
  return {
    name: state.authState.user.name,
    trips: state.tripsState.trips
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateTripPress: () => {
      dispatch(clearTripsError());
      createTrip();
    },
    onDeleteTripPress: (tripId) => {
      dispatch(apiDeleteTrip(tripId));
    },
    onLogoutPress: () => {
      dispatch(logout());
    },
    onViewTrip: (tripId) => {
      dispatch(apiGetTrip(tripId));
      viewTripPage(tripId);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsPage);

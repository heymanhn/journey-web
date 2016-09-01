'use strict';

import { connect } from 'react-redux';
import { clearTripsError, logout } from '../actions/actions';
import { createTrip } from '../actions/navigation';
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
    onLogoutPress: () => {
      dispatch(logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsPage);

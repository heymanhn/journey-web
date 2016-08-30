'use strict';

import { connect } from 'react-redux';
import { logout } from '../actions/actions';
import TripsPage from '../components/TripsPage';

const mapStateToProps = (state) => {
  return {
    name: state.authState.user.name,
    trips: state.tripsState.trips
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutPress: () => {
      dispatch(logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsPage);

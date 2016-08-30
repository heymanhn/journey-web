'use strict';

import { connect } from 'react-redux';
import { logout } from '../actions';
import TripsPage from '../components/TripsPage';

const mapStateToProps = (state) => {
  return {};
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

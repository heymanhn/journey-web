'use strict';

import { connect } from 'react-redux';
import { processLogout } from 'app/actions/auth';
import NavigationBar from 'app/components/NavigationBar';

const mapStateToProps = (state) => {
  return {
    user: state.authState.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutPress() {
      dispatch(processLogout());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

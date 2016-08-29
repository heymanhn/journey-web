'use strict';

import { connect } from 'react-redux';
import { apiLogin, apiSignup } from '../actions';
import IntroPage from '../components/IntroPage';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginPress: () => {
      dispatch(apiLogin());
    },

    onSignupPress: () => {
      dispatch(apiSignup());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroPage);

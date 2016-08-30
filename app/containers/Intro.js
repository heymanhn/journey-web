'use strict';

import { connect } from 'react-redux';
import {
  apiLogin,
  loginSaveEmail,
  loginSavePassword
} from '../actions';
import IntroPage from '../components/IntroPage';

const mapStateToProps = (state) => {
  return {
    email: state.authState.email,
    error: state.authState.error ? state.authState.error.message : ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterEmail: (event) => {
      dispatch(loginSaveEmail(event.target.value));
    },

    onEnterPassword: (event) => {
      dispatch(loginSavePassword(event.target.value));
    },

    onLoginPress: () => {
      dispatch(apiLogin());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroPage);

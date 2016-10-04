'use strict';

import { connect } from 'react-redux';
import { apiPageEvent } from '../actions/analytics';
import {
  apiSignup,
  signupSaveName,
  signupSaveEmail,
  signupSavePassword
} from '../actions/auth';
import SignupPage from '../components/SignupPage';
import { analytics } from '../constants';

const mapStateToProps = (state) => {
  return {
    email: state.authState.newEmail,
    error: state.authState.error ? state.authState.error : '',
    name: state.authState.newName
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterEmail(event) {
      dispatch(signupSaveEmail(event.target.value));
    },

    onEnterName(event) {
      dispatch(signupSaveName(event.target.value));
    },

    onEnterPassword(event) {
      dispatch(signupSavePassword(event.target.value));
    },

    onPageLoaded() {
      dispatch(apiPageEvent(analytics.pages.SIGNUP_PAGE));
    },

    onSignupPress() {
      dispatch(apiSignup());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupPage);

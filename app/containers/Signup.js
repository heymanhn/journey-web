'use strict';

import { connect } from 'react-redux';
import { apiPageEvent } from 'app/actions/analytics';
import {
  apiSignup,
  signupSaveName,
  signupSaveEmail,
  signupSavePassword
} from 'app/actions/auth';
import SignupPage from 'app/components/SignupPage';
import { analytics } from 'app/constants';

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

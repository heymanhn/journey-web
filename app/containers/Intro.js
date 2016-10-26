'use strict';

import { connect } from 'react-redux';
import {
  apiLogin,
  apiSignup,
  clearAuthState,
  loginSaveEmail,
  loginSavePassword,
  signupSaveEmail,
  signupSaveName,
  signupSavePassword
} from 'app/actions/auth';
import { apiPageEvent } from 'app/actions/analytics';
import { resetPageState, setPageLoginState } from 'app/actions/landingPage';
import { analytics } from 'app/constants';
import IntroPage from 'app/components/IntroPage';

const mapStateToProps = (state) => {
  const { error, isFetching } = state.authState;
  const { frame } = state.componentsState.landingPageState;

  return {
    error,
    frame,
    isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearAuthState() {
      dispatch(clearAuthState());
    },

    onEnterEmailForLogin(event) {
      dispatch(loginSaveEmail(event.target.value));
    },

    onEnterEmailForSignup(event) {
      dispatch(signupSaveEmail(event.target.value));
    },

    onEnterNameForSignup(event) {
      dispatch(signupSaveName(event.target.value));
    },

    onEnterPasswordForLogin(event) {
      dispatch(loginSavePassword(event.target.value));
    },

    onEnterPasswordForSignup(event) {
      dispatch(signupSavePassword(event.target.value));
    },

    onLoginPageLoaded() {
      dispatch(apiPageEvent(analytics.pages.LOGIN_PAGE));
    },

    onLoginPress() {
      dispatch(apiLogin());
    },

    onResetPageState() {
      dispatch(resetPageState());
    },

    onSetPageLoginState() {
      dispatch(setPageLoginState());
    },

    onSignupPress() {
      dispatch(apiSignup());
    },

    onSignupPageLoaded() {
      dispatch(apiPageEvent(analytics.pages.SIGNUP_PAGE));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroPage);

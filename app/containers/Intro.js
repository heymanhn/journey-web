'use strict';

import { connect } from 'react-redux';
import {
  apiSignup,
  clearAuthState,
  signupSaveEmail,
  signupSaveName,
  signupSavePassword
} from 'app/actions/auth';
import { apiPageEvent } from 'app/actions/analytics';
import { analytics } from 'app/constants';
import IntroPage from 'app/components/IntroPage';

const mapStateToProps = (state) => {
  const { error, isFetching, signupFields } = state.authState;

  return {
    error,
    isFetching,
    signupFields
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearAuthState() {
      dispatch(clearAuthState());
    },

    onEnterEmailForSignup(event) {
      dispatch(signupSaveEmail(event.target.value));
    },

    onEnterNameForSignup(event) {
      dispatch(signupSaveName(event.target.value));
    },

    onEnterPasswordForSignup(event) {
      dispatch(signupSavePassword(event.target.value));
    },

    onSignupPress() {
      dispatch(apiSignup());
    },

    onPageLoaded() {
      dispatch(apiPageEvent(analytics.pages.LANDING_PAGE));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IntroPage);

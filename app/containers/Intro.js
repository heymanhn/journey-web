'use strict';

import { connect } from 'react-redux';
import {
  apiLogin,
  loginSaveEmail,
  loginSavePassword
} from 'app/actions/auth';
import { apiPageEvent } from 'app/actions/analytics';
import { analytics } from 'app/constants';
import IntroPage from 'app/components/IntroPage';

const mapStateToProps = (state) => {
  const { email, error, token } = state.authState;

  return {
    email,
    error,
    token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterEmail(event) {
      dispatch(loginSaveEmail(event.target.value));
    },

    onEnterPassword(event) {
      dispatch(loginSavePassword(event.target.value));
    },

    onLoginPress() {
      dispatch(apiLogin());
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

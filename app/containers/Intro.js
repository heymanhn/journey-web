'use strict';

import { connect } from 'react-redux';
import {
  apiLogin,
  loginSaveEmail,
  loginSavePassword
} from '../actions/auth';
import { apiPageEvent } from '../actions/analytics';
import { analytics } from '../constants';
import IntroPage from '../components/IntroPage';

const mapStateToProps = (state) => {
  return {
    email: state.authState.email,
    error: state.authState.error ? state.authState.error : ''
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

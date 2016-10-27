'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setOverrideFrame } from 'app/actions/landingPage';
import Intro from './Intro';
import Trips from './Trips';

class Login extends Component {
  componentWillMount() {
    const { onSetOverrideFrameToLogin, token } = this.props;
    !token && onSetOverrideFrameToLogin();
  }

  render() {
    return this.props.token ? <Trips /> : <Intro />;
  }
}

export default connect(
  state => ({
    token: state.authState.token
  }),

  dispatch => {
    return {
      onSetOverrideFrameToLogin() {
        dispatch(setOverrideFrame('login'));
      }
    };
  }
)(Login);

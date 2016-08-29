'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Intro from './Intro';
import Trips from './Trips';

class Home extends Component {
  render() {
    const { authState } = this.props;
    if (authState.token) {
      return <Trips />;
    } else {
      return <Intro />;
    }
  }
}

Home.propTypes = {
  authState: PropTypes.object
};

export default connect(
  state => ({
    authState: state.authState
  }),
  dispatch => ({})
)(Home);

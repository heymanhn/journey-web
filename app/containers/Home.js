'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Intro from './Intro';
import Trips from './Trips';

class Home extends Component {
  render() {
    const { authState: { token } } = this.props;
    if (token) {
      return <Trips />;
    }

    return <Intro />;
  }
}

Home.propTypes = {
  authState: PropTypes.object.isRequired
};

export default connect(
  state => ({
    authState: state.authState
  })
)(Home);

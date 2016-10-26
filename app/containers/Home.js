'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Intro from './Intro';
import Trips from './Trips';

class Home extends Component {
  render() {
    const { token } = this.props;
    if (token) {
      return <Trips />;
    }

    return <Intro />;
  }
}

Home.propTypes = {
  token: PropTypes.string
};

export default connect(
  state => ({
    token: state.authState.token
  })
)(Home);

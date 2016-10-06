'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Intro from './Intro';
import Trips from './Trips';
import { viewTripsPage } from 'app/actions/navigation';

class Home extends Component {
  render() {
    if (this.props.authState.token) {
      return <Trips />;
    }

    return <Intro />;
  }
}

Home.propTypes = {
  authState: PropTypes.object.isRequired,
  onViewTripsPage: PropTypes.func.isRequired
};

export default connect(
  state => ({
    authState: state.authState
  }),
  dispatch => ({
    onViewTripsPage() {
      dispatch(viewTripsPage());
    }
  })
)(Home);

'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Intro from './Intro';
import { viewTripsPage } from 'app/actions/navigation';
import { apiGetTrips } from 'app/actions/trips';

class Home extends Component {
  componentWillMount() {
    const { authState } = this.props;
    if (authState.token) {
      this.props.onLoadHome();
      viewTripsPage();
    }
  }

  render() {
    if (this.props.authState.token) {
      return null;
    }

    return <Intro />;
  }
}

Home.propTypes = {
  authState: PropTypes.object,
  onLoadHome: PropTypes.func.isRequired
};

export default connect(
  state => ({
    authState: state.authState
  }),
  dispatch => ({
    onLoadHome: () => {
      dispatch(apiGetTrips());
    }
  })
)(Home);

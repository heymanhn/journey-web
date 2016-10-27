'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { apiRedirect, clearRedirect } from 'app/actions/auth';
import Intro from './Intro';
import Trips from './Trips';

class Home extends Component {
  render() {
    const { redirect, token } = this.props;
    if (token && !redirect) {
      return <Trips />;
    }

    return <Intro />;
  }
}

Home.propTypes = {
  redirect: PropTypes.func,
  token: PropTypes.string
};

const mapStateToProps = state => {
  const { redirect, token } = state.authState;
  return {
    redirect,
    token
  };
};

export default connect(
  mapStateToProps
)(Home);

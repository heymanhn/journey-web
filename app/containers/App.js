'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    const { content, navigation, token } = this.props;
    return (
      <div>
        {token && navigation}
        {content}
      </div>
    );
  }
}

export default connect(
  state => ({
    token: state.authState.token
  })
)(App);

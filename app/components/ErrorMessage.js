'use strict';

import React, { Component, PropTypes } from 'react';

class ErrorMessage extends Component {
  render() {
    return <div style={styles}>{this.props.error}</div>;
  }
}

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired
};

const styles = {
  backgroundColor: 'orange',
  color: 'black',
  margin: 5,
  width: 200
};

export default ErrorMessage;

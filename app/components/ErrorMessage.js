'use strict';

import React, { Component, PropTypes } from 'react';
import { colors } from 'app/constants';

class ErrorMessage extends Component {
  render() {
    const { error } = this.props;

    return (
      <div style={this.loadStyles()}>
        <span style={styles.errorMessageLabel}>Error:</span>
        {error}
      </div>
    );
  }

  loadStyles() {
    const { style: newStyle } = this.props;
    const { errorMessage: baseStyle } = styles;

    return newStyle ? { ...baseStyle, ...newStyle } : baseStyle;
  }
}

ErrorMessage.propTypes = {
  error: PropTypes.string.isRequired,
  style: PropTypes.object,
};

const styles = {
  errorMessage: {
    backgroundColor: colors.primaryError,
    color: colors.primaryText,
    width: 300
  },
  errorMessageLabel: {
    fontWeight: "bold",
    marginRight: 8,
  }
};

export default ErrorMessage;

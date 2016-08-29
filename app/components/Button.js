'use strict';

import React, { Component, PropTypes } from 'react';
import { buttonStyle } from '../stylesheets/styles';

class Button extends Component {
  render() {
    const { label, onClick } = this.props;
    return (
      <button
        onClick={onClick}
        style={buttonStyle}
        type="button"
      >
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;

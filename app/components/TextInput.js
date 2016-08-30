'use strict';

import React, { Component, PropTypes } from 'react';
import { textInputStyle } from '../stylesheets/styles';

class TextInput extends Component {
  render() {
    const { initialValue, label, type } = this.props;
    return (
      <input
        defaultValue={initialValue}
        placeholder={label}
        style={textInputStyle}
        type={type || "text"}
      />
    );
  }
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  type: PropTypes.string
};

export default TextInput;

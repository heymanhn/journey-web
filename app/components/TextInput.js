'use strict';

import React, { Component, PropTypes } from 'react';
import { textInputStyle } from '../stylesheets/styles';

class TextInput extends Component {
  render() {
    return (
      <input
        {...this.props}
        style={textInputStyle}
      />
    );
  }
}

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string
};

export default TextInput;

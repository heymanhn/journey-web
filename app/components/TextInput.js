'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

class TextInput extends Component {
  render() {
    return (
      <FormControl
        style={this.loadStyles()}
        {..._.omit(this.props, 'width')}
      />
    );
  }

  loadStyles() {
    const { width } = this.props;

    return {
      display: "block",
      color: "#333333",
      fontSize: "16px",
      margin: 5,
      width: width ? width : 300
    };
  }
}

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  width: PropTypes.number
};

export default TextInput;

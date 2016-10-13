'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

class TextInput extends Component {
  render() {
    return (
      <FormControl
        {..._.omit(this.props, 'style')}
        style={this.loadStyles()}
      />
    );
  }

  loadStyles() {
    const { style: newStyle, width } = this.props;

    let style = {
      display: "block",
      color: "#333333",
      fontSize: "16px",
      margin: 5,
      width: 300
    };

    return newStyle ? { ...style, ...newStyle} : style;
  }
}

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string
};

export default TextInput;

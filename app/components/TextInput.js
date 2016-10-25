'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false
    };
  }
  render() {
    return (
      <input
        {..._.omit(this.props, 'style')}
        onBlur={this.clearFocus.bind(this)}
        onFocus={this.setFocus.bind(this)}
        style={this.loadStyles()}
      />
    );
  }

  setFocus() {
    this.setState({ focused: true });
  }

  clearFocus() {
    this.setState({ focused: false });
  }

  loadStyles() {
    const { style: newStyle, width } = this.props;
    const { focused } = this.state;
    const baseStyle = styles.inputField;

    if (focused) {
      baseStyle.border = "1px solid #666666";
      baseStyle.outline = "none";
    } else {
      baseStyle.border = "1px solid #dddddd";
    }

    return newStyle ? { ...baseStyle, ...newStyle} : baseStyle;
  }
}

TextInput.propTypes = {
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object,
  type: PropTypes.string
};

const styles = {
  inputField: {
    borderRadius: 3,
    display: "block",
    color: "#666666",
    fontSize: 14,
    height: 36,
    padding: "6px 15px",
    width: 300
  }
}

export default TextInput;

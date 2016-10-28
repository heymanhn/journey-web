'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Spinner from './Spinner';
import { colors } from 'app/constants';

class SubmitButton extends Component {
  render() {
    const { disabled, isFetching, onSubmitPress, tabIndex, text } = this.props;

    const loadingSpinner = (
      <Spinner
        customColor="white"
        customStyle={styles.spinner}
      />
    );

    return (
      <Button
        disabled={disabled}
        onClick={onSubmitPress}
        style={this.loadStyles()}
        tabIndex={tabIndex}
      >
        {isFetching ? loadingSpinner : text}
      </Button>
    );
  }

  loadStyles() {
    const { style: newStyle } = this.props;
    const { submitButton: baseStyle } = styles;

    return newStyle ? { ...baseStyle, ...newStyle } : baseStyle;
  }
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  isFetching: PropTypes.bool.isRequired,
  onSubmitPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  tabIndex: PropTypes.number,
  text: PropTypes.string.isRequired
};

const styles = {
  spinner: {
    height: 20,
    left: "50%",
    position: "relative",
    top: 10,
    width: 25
  },
  submitButton: {
    backgroundColor: colors.primary,
    border: "none",
    borderRadius: 25,
    fontSize: 14,
    height: 40,
    letterSpacing: 0.3,
    color: "#ffffff",
    fontWeight: 500,
    margin: "10px 0px",
    padding: "0px 25px"
  }
};

export default SubmitButton;

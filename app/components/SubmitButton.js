import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Spinner from './Spinner';
import { colors } from 'app/constants';

class SubmitButton extends Component {
  render() {
    const { isFetching, onSubmitPress, text } = this.props;

    const loadingSpinner = (
      <Spinner
        customColor="white"
        customStyle={styles.spinner}
      />
    );

    return (
      <Button
        onClick={onSubmitPress}
        style={this.loadStyles()}
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
  isFetching: PropTypes.bool.isRequired,
  onSubmitPress: PropTypes.func.isRequired,
  style: PropTypes.object,
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
    fontSize: 16,
    letterSpacing: 0.3,
    color: "#ffffff",
    fontWeight: 500,
    margin: "10px 0px",
    padding: "12px 25px"
  }
};

export default SubmitButton;

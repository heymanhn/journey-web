import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { colors } from 'app/constants';

class SubmitButton extends Component {
  render() {
    const { onSubmitPress, text } = this.props;

    return (
      <Button
        onClick={onSubmitPress}
        style={this.loadStyles()}
      >
        {text}
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
  onSubmitPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  text: PropTypes.string.isRequired
};

const styles = {
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

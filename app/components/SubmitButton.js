'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Spinner from './Spinner';
import { clearSuccessState } from 'app/actions/submitButton';
import { colors, transitions } from 'app/constants';

class SubmitButton extends Component {
  componentWillReceiveProps(nextProps) {
    const { onClearSuccessState, success } = nextProps;
    success && onClearSuccessState();
  }

  render() {
    const {
      disabled,
      isFetching,
      onSubmitPress,
      success,
      tabIndex,
      text
    } = this.props;

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
        {isFetching ? loadingSpinner : (success ? 'Saved!' : text) }
      </Button>
    );
  }

  loadStyles() {
    const { success, style: newStyle } = this.props;
    let { submitButton: baseStyle } = styles;

    if (newStyle) {
      baseStyle = { ...baseStyle, ...newStyle };
    }

    if (success) {
      baseStyle.backgroundColor = "#28a918";
    }

    return baseStyle;
  }
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool,
  isFetching: PropTypes.bool.isRequired,
  onClearSuccessState: PropTypes.func.isRequired,
  onSubmitPress: PropTypes.func.isRequired,
  style: PropTypes.object,
  success: PropTypes.bool,
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

const mapStateToProps = state => ({
  success: state.componentsState.submitButtonState.success
});

const mapDispatchToProps = dispatch => ({
  onClearSuccessState() {
    setTimeout(
      () => dispatch(clearSuccessState()),
      transitions.submitButtonSuccess
    );
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitButton);

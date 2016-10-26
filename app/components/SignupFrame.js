'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';
import { colors } from 'app/constants';

class SignupFrame extends Component {
  componentDidMount() {
    this.props.onSignupPageLoaded();
  }

  render() {
    const {
      error,
      isFetching,
      onEnterEmailForSignup,
      onEnterNameForSignup,
      onEnterPasswordForSignup,
      onSignupPress
    } = this.props;

    return (
      <div style={styles.mainSection}>
        <div>
          <div style={styles.mainContent}>
            <h1 style={styles.logo}>Journey</h1>
            <h2 style={styles.tagline}>
              Start your dream trips here.
            </h2>
            <div>
              <TextInput
                onChange={onEnterEmailForSignup}
                placeholder="Email Address"
                style={styles.textField}
                type="text"
              />

              <TextInput
                onChange={onEnterNameForSignup}
                placeholder="Full Name"
                style={styles.textField}
                type="text"
              />

              <TextInput
                onChange={onEnterPasswordForSignup}
                placeholder="Password"
                style={styles.textField}
                type="password"
              />
            </div>
          </div>

          {error && (
            <ErrorMessage error={error} style={styles.errorMessage}/>
          )}

          <div style={styles.mainContent}>
            <SubmitButton
              isFetching={isFetching}
              onSubmitPress={onSignupPress}
              style={styles.signupButton}
              text="Create Account"
            />
          </div>
        </div>
        <div style={styles.loginHint}>
          Already have an account?
          <span
            onClick={this.setPageToLogin.bind(this)}
            style={styles.loginButton}
          >
            Log in
          </span>
        </div>
      </div>
    );
  }

  setPageToLogin() {
    const { onClearOverrideFrame, onSetPageLoginState} = this.props;

    onClearOverrideFrame();
    onSetPageLoginState();
  }
}

SignupFrame.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  onClearOverrideFrame: PropTypes.func.isRequired,
  onEnterEmailForSignup: PropTypes.func.isRequired,
  onEnterNameForSignup: PropTypes.func.isRequired,
  onEnterPasswordForSignup: PropTypes.func.isRequired,
  onSetPageLoginState: PropTypes.func.isRequired,
  onSignupPageLoaded: PropTypes.func.isRequired,
  onSignupPress: PropTypes.func.isRequired
};

const styles = {
  errorMessage: {
    margin: "15px 0px 5px",
    padding: "10px 30px",
    width: "100%"
  },
  loginButton: {
    color: colors.primary,
    cursor: "pointer",
    fontWeight: 500,
    marginLeft: 15
  },
  loginHint: {
    fontSize: 18,
    padding: "0px 30px 30px"
  },
  logo: {
    cursor: "default",
    fontFamily: "'Lobster', cursive",
    fontSize: 64,
    margin: "30px 0px 20px",

    // Disable text selection
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none"
  },
  mainContent: {
    padding: "0px 30px"
  },
  mainSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 450
  },
  signupButton: {
    height: 45,
    width: 170
  },
  tagline: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: 30,
    fontWeight: 300,
    margin: "0px 0px 25px"
  },
  textField: {
    backgroundColor: "#fcfcfc",
    fontSize: 16,
    height: 45,
    margin: "15px 0px"
  }
};

export default SignupFrame;

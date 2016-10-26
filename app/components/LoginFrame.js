'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';
import { colors } from 'app/constants';

class LoginFrame extends Component {
  componentDidMount() {
    this.props.onLoginPageLoaded();
  }

  render() {
    const {
      error,
      isFetching,
      onEnterEmailForLogin,
      onEnterPasswordForLogin,
      onResetPageState,
      onLoginPress
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
                onChange={onEnterEmailForLogin}
                placeholder="Email Address"
                style={styles.textField}
                type="text"
              />

              <TextInput
                onChange={onEnterPasswordForLogin}
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
              onSubmitPress={onLoginPress}
              style={styles.loginButton}
              text="Log in"
            />
          </div>
        </div>
        <div style={styles.signupHint}>
          Don't have an account?
          <span
            onClick={onResetPageState}
            style={styles.signupButton}
          >
            Sign Up
          </span>
        </div>
      </div>
    );
  }
}

LoginFrame.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  onEnterEmailForLogin: PropTypes.func.isRequired,
  onEnterPasswordForLogin: PropTypes.func.isRequired,
  onLoginPageLoaded: PropTypes.func.isRequired,
  onLoginPress: PropTypes.func.isRequired,
  onResetPageState: PropTypes.func.isRequired
};

const styles = {
  errorMessage: {
    margin: "15px 0px 5px",
    padding: "10px 30px",
    width: "100%"
  },
  loginButton: {
    height: 45,
    width: 100
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
    color: colors.primary,
    cursor: "pointer",
    fontWeight: 500,
    marginLeft: 15
  },
  signupHint: {
    fontSize: 18,
    padding: "0px 30px 30px"
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

export default LoginFrame;

'use strict';

require('../stylesheets/landing-page.css');

import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Button } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';
import { colors, transitions } from 'app/constants';

class LoginFrame extends Component {
  componentWillMount() {
    this.props.onClearAuthState();
  }

  componentDidMount() {
    this.props.onLoginPageLoaded();
  }

  render() {
    const {
      error,
      isFetching,
      onEnterEmailForLogin,
      onEnterPasswordForLogin,
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
            <ReactCSSTransitionGroup
              transitionName="frame"
              transitionAppear={true}
              transitionAppearTimeout={transitions.landingPageFrame}
              transitionEnterTimeout={0}
              transitionLeaveTimeout={0}
            >
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
            </ReactCSSTransitionGroup>
          </div>

          {error && (
            <ErrorMessage error={error} style={styles.errorMessage}/>
          )}

          <ReactCSSTransitionGroup
            transitionName="frame"
            transitionAppear={true}
            transitionAppearTimeout={transitions.landingPageFrame}
            transitionEnterTimeout={0}
            transitionLeaveTimeout={0}
          >
            <div style={styles.mainContent}>
              <SubmitButton
                isFetching={isFetching}
                onSubmitPress={onLoginPress}
                style={styles.loginButton}
                text="Log in"
              />
            </div>
          </ReactCSSTransitionGroup>
        </div>

        <ReactCSSTransitionGroup
          transitionName="frame"
          transitionAppear={true}
          transitionAppearTimeout={transitions.landingPageFrame}
          transitionEnterTimeout={0}
          transitionLeaveTimeout={0}
        >
          <div style={styles.signupHint}>
            Don't have an account?
            <span
              onClick={this.setPageToSignup.bind(this)}
              style={styles.signupButton}
            >
              Sign Up
            </span>
          </div>
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  setPageToSignup() {
    const { onClearOverrideFrame, onSetPageSignupState } = this.props;

    onClearOverrideFrame();
    onSetPageSignupState();
  }
}

LoginFrame.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  onClearAuthState: PropTypes.func.isRequired,
  onClearOverrideFrame: PropTypes.func.isRequired,
  onEnterEmailForLogin: PropTypes.func.isRequired,
  onEnterPasswordForLogin: PropTypes.func.isRequired,
  onLoginPageLoaded: PropTypes.func.isRequired,
  onLoginPress: PropTypes.func.isRequired,
  onSetPageSignupState: PropTypes.func.isRequired
};

const styles = {
  errorMessage: {
    margin: "15px 0px 5px",
    padding: "10px 30px",
    width: "100%"
  },
  loginButton: {
    width: 90
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
    fontSize: 16,
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

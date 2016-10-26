'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { viewSignupPage } from 'app/actions/navigation';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';
import { colors } from 'app/constants';

class IntroPage extends Component {
  componentWillMount() {
    this.props.onClearAuthState();
  }

  componentDidMount() {
    this.props.onPageLoaded();
  }

  render() {
    const {
      error,
      onEnterEmailForSignup,
      onEnterNameForSignup,
      onEnterPasswordForSignup,
      onSignupPress,
      onPageLoaded,
      signupFields
    } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.redBgBanner}></div>
        <div style={styles.box}>
          <div style={styles.heroSection}>
            <img src="../assets/placeholder-hero.png"/>
          </div>
          <div style={styles.mainSection}>
            <div>
              <div style={styles.mainSectionWithPadding}>
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

              <div style={styles.mainSectionWithPadding}>
                <SubmitButton
                  onSubmitPress={onSignupPress}
                  text="Create Account"
                />
              </div>
            </div>

            <div style={styles.loginHint}>
              Already have an account?
              <span
                style={styles.loginButton}
              >
                Log in
              </span>
            </div>
          </div>
        </div>
        <div style={styles.copyright}>
          (c) Journey Labs 2016
        </div>
      </div>
    );
  }
}

IntroPage.propTypes = {
  error: PropTypes.string,
  onClearAuthState: PropTypes.func.isRequired,
  onEnterEmailForSignup: PropTypes.func.isRequired,
  onEnterNameForSignup: PropTypes.func.isRequired,
  onEnterPasswordForSignup: PropTypes.func.isRequired,
  onSignupPress: PropTypes.func.isRequired,
  onPageLoaded: PropTypes.func.isRequired,
  signupFields: PropTypes.object.isRequired
};

const styles = {
  box: {
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    display: "flex",
    margin: "0px auto",
    position: "relative",
    top: -100,
    width: 900
  },
  container: {
    backgroundColor: colors.background
  },
  copyright: {
    color: colors.primaryText,
    fontSize: 16,
    margin: "25px auto 0px",
    position: "relative",
    textAlign: "center",
    top: -100,
    width: 900
  },
  errorMessage: {
    margin: "15px 0px 5px",
    padding: "10px 30px",
    width: "100%"
  },
  heroSection: {
    width: 450
  },
  loginButton: {
    color: colors.primary,
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
    margin: "0px 0px 20px",
    paddingTop: 30,

    // Disable text selection
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none"
  },
  mainSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 450
  },
  mainSectionWithPadding: {
    padding: "0px 30px"
  },
  redBgBanner: {
    backgroundColor: colors.primary,
    height: 200
  },
  tagline: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: 30,
    fontWeight: 300,
    margin: "0px 0px 40px"
  },
  textField: {
    backgroundColor: "#fcfcfc",
    fontSize: 16,
    height: 45,
    margin: "15px 0px"
  }
};

export default IntroPage;

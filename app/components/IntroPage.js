'use strict';

import React, { Component, PropTypes } from 'react';
import LoginFrame from './LoginFrame';
import SignupFrame from './SignupFrame';
import { colors } from 'app/constants';

class IntroPage extends Component {
  componentWillMount() {
    const { onClearAuthState, onResetPageState } = this.props;
    onClearAuthState();
    onResetPageState();
  }

  render() {
    const { frame } = this.props;

    let contentFrame;
    if (frame === 'signup') {
      contentFrame = <SignupFrame {...this.props} />
    } else if (frame === 'login') {
      contentFrame = <LoginFrame {...this.props} />
    } else {
      return null;
    }

    return (
      <div style={styles.container}>
        <div style={styles.redBgBanner}></div>
        <div style={styles.box}>
          <div style={styles.heroSection}>
            <img src="../assets/placeholder-hero.png"/>
          </div>
          {contentFrame}
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
  frame: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onClearAuthState: PropTypes.func.isRequired,
  onEnterEmailForLogin: PropTypes.func.isRequired,
  onEnterEmailForSignup: PropTypes.func.isRequired,
  onEnterNameForSignup: PropTypes.func.isRequired,
  onEnterPasswordForLogin: PropTypes.func.isRequired,
  onEnterPasswordForSignup: PropTypes.func.isRequired,
  onLoginPageLoaded: PropTypes.func.isRequired,
  onLoginPress: PropTypes.func.isRequired,
  onSetPageLoginState: PropTypes.func.isRequired,
  onSignupPageLoaded: PropTypes.func.isRequired,
  onSignupPress: PropTypes.func.isRequired
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
  heroSection: {
    width: 450
  },
  redBgBanner: {
    backgroundColor: colors.primary,
    height: 200
  }
};

export default IntroPage;

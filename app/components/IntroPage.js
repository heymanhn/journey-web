'use strict';

import React, { Component, PropTypes } from 'react';
import { viewSignupPage } from '../actions/navigation';
import Button from './Button';
import TextInput from './TextInput';
import { errorMessageStyle } from '../stylesheets/styles';

class IntroPage extends Component {
  render() {
    const {
      email,
      error,
      onEnterEmail,
      onEnterPassword,
      onLoginPress
    } = this.props;

    return (
      <div>
        <h1>Journey - Amazing trip plans</h1>
        <div>
          <TextInput
            defaultValue={email}
            onChange={onEnterEmail}
            placeholder="Email Address"
          />
          <TextInput
            onChange={onEnterPassword}
            placeholder="Password"
            type="password"
          />
          <div style={errorMessageStyle}>{error}</div>
          <Button label="Log In" onClick={onLoginPress} />
          <Button label="Sign Up" onClick={viewSignupPage} />
        </div>
      </div>
    );
  }
}

IntroPage.propTypes = {
  email: PropTypes.string,
  error: PropTypes.string,
  onEnterEmail: PropTypes.func.isRequired,
  onEnterPassword: PropTypes.func.isRequired,
  onLoginPress: PropTypes.func.isRequired
};

export default IntroPage;

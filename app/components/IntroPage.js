'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { viewSignupPage } from '../actions/navigation';
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
          <Button bsStyle="default" onClick={onLoginPress}>Log In</Button>
          <Button bsStyle="default" onClick={viewSignupPage}>Sign Up</Button>
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

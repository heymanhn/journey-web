'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { viewSignupPage } from 'app/actions/navigation';
import ErrorMessage from './ErrorMessage';
import TextInput from './TextInput';
import Trips from 'app/containers/Trips';

class IntroPage extends Component {
  render() {
    const {
      email,
      error,
      onEnterEmail,
      onEnterPassword,
      onLoginPress,
      onPageLoaded,
      token
    } = this.props;

    if (token) {
      return <Trips />;
    }

    // Analytics tracking for Landing page views
    onPageLoaded();

    return (
      <div>
        <h1>Journey - Amazing trip plans</h1>
        <div>
          <TextInput
            defaultValue={email}
            onChange={onEnterEmail}
            placeholder="Email Address"
            type="text"
          />
          <TextInput
            onChange={onEnterPassword}
            placeholder="Password"
            type="password"
          />
          {error && <ErrorMessage error={error} />}
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
  onLoginPress: PropTypes.func.isRequired,
  onPageLoaded: PropTypes.func.isRequired,
  token: PropTypes.string
};

export default IntroPage;

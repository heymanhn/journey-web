'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';
import TextInput from './TextInput';

class SignupPage extends Component {
  render() {
    const {
      email,
      error,
      name,
      onEnterEmail,
      onEnterName,
      onEnterPassword,
      onSignupPress
    } = this.props;

    return (
      <div>
        <h1>Signup page</h1>
        <div>
          <TextInput
            defaultValue={name}
            onChange={onEnterName}
            placeholder="Name"
          />
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
          {error && <ErrorMessage error={error} />}
          <Button
            bsStyle="default"
            onClick={onSignupPress}
          >
            Create Account
          </Button>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  email: PropTypes.string,
  error: PropTypes.string,
  name: PropTypes.string,
  onEnterEmail: PropTypes.func.isRequired,
  onEnterName: PropTypes.func.isRequired,
  onEnterPassword: PropTypes.func.isRequired,
  onSignupPress: PropTypes.func.isRequired
};

export default SignupPage;

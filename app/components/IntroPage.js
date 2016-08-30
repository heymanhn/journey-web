'use strict';

import React, { Component, PropTypes } from 'react';
import Button from './Button';
import TextInput from './TextInput';

class IntroPage extends Component {
  render() {
    const { onLoginPress, onSignupPress } = this.props;

    return (
      <div>
        <h1>Journey - Amazing trip plans</h1>
        <div>
          <TextInput label="Email Address" />
          <TextInput label="Password" type="password" />
          <Button label="Log In" onClick={onLoginPress} />
          <Button label="Sign Up" onClick={onSignupPress} />
        </div>
      </div>
    );
  }
}

IntroPage.propTypes = {
  onLoginPress: PropTypes.func.isRequired,
  onSignupPress: PropTypes.func.isRequired
};

export default IntroPage;

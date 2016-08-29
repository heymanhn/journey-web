'use strict';

import React, { Component, PropTypes } from 'react';
import TextInput from './TextInput';

class IntroPage extends Component {
  render() {
    return (
      <div>
        <h1>Journey - Amazing trip plans</h1>
        <div>
          <TextInput
            label="Email Address"
          />
          <TextInput
            label="Password"
          />
          <h2>Log in</h2>
          <h2>Sign up</h2>
        </div>
      </div>
    );
  }
}

IntroPage.propTypes = {};

export default IntroPage;

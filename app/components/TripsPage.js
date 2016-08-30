'use strict';

import React, { Component, PropTypes } from 'react';
import Button from './Button';

class TripsPage extends Component {
  render() {
    const { name, onLogoutPress } = this.props;

    return (
      <div>
        <h1>Trips page</h1>
        <p>Welcome, {name}!</p>
        <Button label="Log Out" onClick={onLogoutPress} />
      </div>
    );
  }
}

TripsPage.propTypes = {
  name: PropTypes.string,
  onLogoutPress: PropTypes.func.isRequired
};

export default TripsPage;

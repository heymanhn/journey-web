'use strict';

import React, { Component, PropTypes } from 'react';
import Button from './Button';

class TripsPage extends Component {
  render() {
    const { onLogoutPress } = this.props;

    return (
      <div>
        <h1>Trips page</h1>
        <Button label="Log Out" onClick={onLogoutPress} />
      </div>
    );
  }
}

TripsPage.propTypes = {
  onLogoutPress: PropTypes.func.isRequired
};

export default TripsPage;

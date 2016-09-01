'use strict';

import React, { Component, PropTypes } from 'react';
import Button from './Button';
import TripsList from './TripsList';

class TripsPage extends Component {
  render() {
    const {
      name,
      onCreateTripPress,
      onLogoutPress,
      trips
    } = this.props;

    return (
      <div>
        <h1>Trips page</h1>
        <p>Welcome, {name}!</p>
        <Button label="Create Trip" onClick={onCreateTripPress} />
        <TripsList trips={trips} />
        <Button label="Log Out" onClick={onLogoutPress} />
      </div>
    );
  }
}

TripsPage.propTypes = {
  name: PropTypes.string,
  onCreateTripPress: PropTypes.func.isRequired,
  onLogoutPress: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired
};

export default TripsPage;

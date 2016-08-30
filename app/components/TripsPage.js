'use strict';

import React, { Component, PropTypes } from 'react';
import { createTrip } from '../actions/navigation';
import Button from './Button';
import TripsList from './TripsList';

class TripsPage extends Component {
  render() {
    const {
      name,
      onLogoutPress,
      trips
    } = this.props;

    return (
      <div>
        <h1>Trips page</h1>
        <p>Welcome, {name}!</p>
        <Button label="Create Trip" onClick={createTrip} />
        <TripsList trips={trips} />
        <Button label="Log Out" onClick={onLogoutPress} />
      </div>
    );
  }
}

TripsPage.propTypes = {
  name: PropTypes.string,
  onLogoutPress: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired
};

export default TripsPage;

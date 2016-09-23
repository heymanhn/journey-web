'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import TripsList from './TripsList';

class TripsPage extends Component {
  render() {
    const {
      name,
      onCreateTripPress,
      onDeleteTripPress,
      onLogoutPress,
      onViewTrip,
      trips
    } = this.props;

    return (
      <div>
        <h1>Trips page</h1>
        <p>Welcome, {name}!</p>
        <Button
          bsStyle="primary"
          onClick={onCreateTripPress}
        >
          Create Trip
        </Button>
        <TripsList
          trips={trips}
          onDeleteTripPress={onDeleteTripPress}
          onViewTrip={onViewTrip}
        />
        <Button
          bsStyle="primary"
          onClick={onLogoutPress}
        >
          Log Out
        </Button>
      </div>
    );
  }
}

TripsPage.propTypes = {
  name: PropTypes.string,
  onCreateTripPress: PropTypes.func.isRequired,
  onDeleteTripPress: PropTypes.func.isRequired,
  onLogoutPress: PropTypes.func.isRequired,
  onViewTrip: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired
};

export default TripsPage;

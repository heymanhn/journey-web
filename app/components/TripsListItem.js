'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class TripsListItem extends Component {
  render() {
    const { onDeleteTripPress, onViewTrip, trip } = this.props;

    return (
      <div style={tripsListItemStyle}>
        <p>Name: {trip.title}</p>
        <p>Destination: {trip.destination && trip.destination.name}</p>
        <p>Visibility: {trip.visibility}</p>
        <Button
          bsStyle="default"
          onClick={onViewTrip.bind(null, trip._id)}
        >
          View Trip
        </Button>
        <Button
          bsStyle="warning"
          onClick={onDeleteTripPress.bind(null, trip._id)}
        >
          Delete Trip
        </Button>
      </div>
    );
  }
}

TripsListItem.propTypes = {
  onDeleteTripPress: PropTypes.func.isRequired,
  onViewTrip: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};

const tripsListItemStyle = {
  backgroundColor: '#eeeeee',
  border: '1px solid #333333',
  margin: 5,
  padding: 5,
  width: 300
};

export default TripsListItem;

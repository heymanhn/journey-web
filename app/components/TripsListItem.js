'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { viewTripPage } from '../actions/navigation';
import { tripsListItemStyle } from '../stylesheets/styles';

class TripsListItem extends Component {
  render() {
    const { trip } = this.props;

    return (
      <div style={tripsListItemStyle}>
        <p>Name: {trip.title}</p>
        <p>Destination: {trip.destination && trip.destination.name}</p>
        <p>Visibility: {trip.visibility}</p>
        <Button
          bsStyle="default"
          onClick={viewTripPage.bind(null, trip._id)}
        >
          View Trip
        </Button>
      </div>
    );
  }
}

TripsListItem.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripsListItem;

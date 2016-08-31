'use strict';

import React, { Component, PropTypes } from 'react';
import Button from './Button';
import { viewTripPage } from '../actions/navigation';
import { tripsListItemStyle } from '../stylesheets/styles';

class TripsListItem extends Component {
  render() {
    const { trip } = this.props;

    return (
      <div style={tripsListItemStyle}>
        <p>Name: {trip.title}</p>
        <p>Destination: {trip.destination.name}</p>
        <p>Visibility: {trip.visibility}</p>
        <Button
          label="View Trip"
          onClick={viewTripPage.bind(null, trip._id)}
        />
      </div>
    );
  }
}

TripsListItem.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripsListItem;

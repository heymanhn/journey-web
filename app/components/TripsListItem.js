'use strict';

import React, { Component, PropTypes } from 'react';
import Button from './Button';
import { tripsListItemStyle } from '../stylesheets/styles';

class TripsListItem extends Component {
  render() {
    const { trip } = this.props;

    return (
      <div style={tripsListItemStyle}>
        <p>Name: {trip.title}</p>
        <p>Destination: {trip.destination.name}</p>
        <p>Visibility: {trip.visibility}</p>
      </div>
    );
  }
}

TripsListItem.propTypes = {
  trip: PropTypes.object.isRequired
};

export default TripsListItem;

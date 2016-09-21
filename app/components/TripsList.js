'use strict';

import React, { Component, PropTypes } from 'react';
import TripsListItem from './TripsListItem';

class TripsList extends Component {
  render() {
    const { onViewTrip, trips } = this.props;

    var tripsList = trips.map(trip => {
      return (
        <TripsListItem
          key={trip._id}
          trip={trip}
          onViewTrip={onViewTrip}
        />
      );
    });

    return (
      <div>
        {tripsList}
      </div>
    );
  }
}

TripsList.propTypes = {
  onViewTrip: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired
};

export default TripsList;

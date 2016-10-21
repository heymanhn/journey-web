'use strict';

import React, { Component, PropTypes } from 'react';
import TripsListItem from './TripsListItem';

class TripsList extends Component {
  render() {
    const { onDeleteTripPress, onViewTrip, trips } = this.props;

    var tripsList = trips.map(trip => {
      return (
        <TripsListItem
          key={trip._id}
          trip={trip}
          onDeleteTripPress={onDeleteTripPress}
          onViewTrip={onViewTrip}
        />
      );
    });

    return (
      <div style={styles.tripsList}>
        {tripsList}
      </div>
    );
  }
}

TripsList.propTypes = {
  onDeleteTripPress: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired
};

const styles = {
  tripsList: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between"
  }
};

export default TripsList;

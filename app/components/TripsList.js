'use strict';

import React, { Component, PropTypes } from 'react';
import TripsListItem from './TripsListItem';

class TripsList extends Component {
  render() {
    const { trips } = this.props;

    var tripsList = trips.map(trip => {
      return <TripsListItem key={trip._id} trip={trip} />;
    });

    return (
      <div>
        {tripsList}
      </div>
    );
  }
}

TripsList.propTypes = {
  trips: PropTypes.array.isRequired
};

export default TripsList;

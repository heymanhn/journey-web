'use strict';

import React, { Component, PropTypes } from 'react';
import TripsListItem from 'app/containers/TripsListItem';

class TripsList extends Component {
  render() {
    const { trips } = this.props;

    var tripsList = trips.map(trip => {
      return <TripsListItem key={trip._id} trip={trip} />;
    });

    return (
      <div style={styles.tripsList}>
        {tripsList}
      </div>
    );
  }
}

TripsList.propTypes = {
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

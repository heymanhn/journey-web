'use strict';

import React, { Component, PropTypes } from 'react';
import { dimensions } from 'app/constants';

class TripDetails extends Component {
  render() {
    const { trip } = this.props;
    return (
      <div style={styles.titleSection}>
        <h1 style={styles.h1}>{trip.title}</h1>
        <p>Destination: {trip.destination && trip.destination.name}</p>
        <p>Visibility: {trip.visibility}</p>
      </div>
    );
  }
}

TripDetails.propTypes = {
  trip: PropTypes.object.isRequired
};

const styles = {
  h1: {
    fontSize: 36,
    marginTop: 0,
    paddingTop: 20
  },
  titleSection: {
    marginTop: dimensions.navigationBar.height,
    padding: "0 " + dimensions.leftColumn.sidePadding + " 0"
  }
};

export default TripDetails;

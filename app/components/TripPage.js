'use strict';

require('../stylesheets/react-spinner.css');

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Spinner from './Spinner';
import TripIdeas from '../containers/TripIdeas';
import { viewTripsPage } from '../actions/navigation';

class TripPage extends Component {
  componentWillMount() {
    const { tripId } = this.props.params;
    const { onGetTrip, trip } = this.props;

    // Fetch the trip from the server upon load
    if (!trip) {
      onGetTrip(tripId);
    }
  }

  render() {
    const { error, trip } = this.props;

    if (error) {
      return (
        <div>{error}</div>
      );
    }

    // Loading UI
    if (!trip) {
      return (
        <div>
          <p style={styles.loadingText}>Loading Trip</p>
          <div>
            <Spinner />
          </div>
        </div>
      );
    }

    const tripPlan = trip.plan.map(day => {
      return (
        <p key={day._id}>Day</p>
      );
    });

    const titleSection = (
      <div style={styles.titleSection}>
        <h1 style={styles.h1}>{trip.title}</h1>
        <p>Destination: {trip.destination && trip.destination.name}</p>
        <p>Visibility: {trip.visibility}</p>
      </div>
    );

    return (
      <div>
        <div style={styles.leftColumn}>
          {titleSection}
          <TripIdeas />
          <Button
            bsStyle="primary"
            onClick={viewTripsPage}>
            Home
          </Button>
        </div>
        <div>
          <h1>Map</h1>
        </div>
      </div>
    );
  }
}

TripPage.propTypes = {
  error: PropTypes.string,
  onGetTrip: PropTypes.func.isRequired,
  trip: PropTypes.object
};

const styles = {
  h1: {
    fontSize: 32
  },
  leftColumn: {
    float: 'left',
    padding: '0 20 0',
    width: 400
  },
  loadingText: {
    color: '#333333',
    fontFamily: 'Arial',
    fontSize: 24,
    textAlign: 'center',
    margin: 20
  },
  titleSection: {
    marginBottom: 30
  }
};

export default TripPage;

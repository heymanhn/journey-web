'use strict';

require('app/stylesheets/react-spinner.css');

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Spinner from './Spinner';
import TripIdeas from 'app/containers/TripIdeas';
import TripMap from 'app/containers/TripMap';
import { viewTripsPage } from 'app/actions/navigation';

class TripPage extends Component {
  componentDidMount() {
    this.props.trackPageView();
  }

  componentWillMount() {
    const { onGetTrip, trip } = this.props;

    // Fetch the trip from the server upon load
    if (!trip) {
      onGetTrip();
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
          <TripMap />
        </div>
      </div>
    );
  }
}

TripPage.propTypes = {
  error: PropTypes.string,
  onGetTrip: PropTypes.func.isRequired,
  trackPageView: PropTypes.func.isRequired,
  trip: PropTypes.object
};

const styles = {
  h1: {
    fontSize: 32
  },
  leftColumn: {
    backgroundColor: 'white',
    float: 'left',
    height: '100%',
    overflow: 'scroll',
    padding: '0 30 0',
    position: 'absolute',
    width: 400,
    zIndex: 2
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

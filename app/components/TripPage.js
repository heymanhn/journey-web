'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import LoadingAnimation from './LoadingAnimation';
import Navigation from 'app/containers/Navigation';
import TripIdeas from 'app/containers/TripIdeas';
import TripMap from 'app/containers/TripMap';
import { dimensions } from 'app/constants';

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
    const { error, onViewTrips, trip } = this.props;

    if (error) {
      return (
        <div>{error}</div>
      );
    }

    // Loading UI
    if (!trip) {
      return <LoadingAnimation element="Trip" />;
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
          <div style={styles.navigationBar}>
            <Navigation />
          </div>
          <div style={styles.ideasSection}>
            {titleSection}
            <TripIdeas />
          </div>
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
  onViewTrips: PropTypes.func.isRequired,
  trackPageView: PropTypes.func.isRequired,
  trip: PropTypes.object
};

const styles = {
  h1: {
    fontSize: 32,
    marginTop: 0,
    paddingTop: 20
  },
  ideasSection: {
    marginTop: dimensions.navigationBar.height,
    padding: '0 ' + dimensions.leftColumn.sidePadding + ' 0'
  },
  leftColumn: {
    backgroundColor: 'white',
    float: 'left',
    height: '100%',
    overflow: 'scroll',
    width: dimensions.leftColumn.width,
    zIndex: 2
  },
  loadingText: {
    color: '#333333',
    fontFamily: 'Arial',
    fontSize: 24,
    textAlign: 'center',
    margin: 20
  },
  navigationBar: {
    position: 'fixed',
    zIndex: 3
  },
  titleSection: {
    marginBottom: 30
  }
};

export default TripPage;

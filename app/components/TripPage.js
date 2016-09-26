'use strict';

require('../stylesheets/react-spinner.css');

import React, { Component, PropTypes } from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
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

    return (
      <Grid>
        <Row>
          <Col md={12} style={styles.titleSection}>
            <h1 style={styles.h1}>{trip.title}</h1>
            <p>Destination: {trip.destination && trip.destination.name}</p>
            <p>Visibility: {trip.visibility}</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <TripIdeas />
          </Col>
          <Col md={8}>
            <h3>Plan</h3>
            <div>{tripPlan}</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              bsStyle="primary"
              onClick={viewTripsPage}>
              Home
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

TripPage.propTypes = {
  error: PropTypes.string,
  onGetTrip: PropTypes.func.isRequired,
  trip: PropTypes.object
};

const styles = {
  titleSection: {
    textAlign: 'center'
  },
  h1: {
    fontSize: 48
  },
  loadingText: {
    color: '#333333',
    fontFamily: 'Arial',
    fontSize: 24,
    textAlign: 'center',
    margin: 20
  }
};

export default TripPage;

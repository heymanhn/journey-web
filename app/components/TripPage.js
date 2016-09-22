'use strict';

import React, { Component, PropTypes } from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import TripPageIdeas from '../containers/TripPageIdeas';
import { viewTripsPage } from '../actions/navigation';
import { tripPageStyles as styles } from '../stylesheets/styles';

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
      return null;
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
            <TripPageIdeas />
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

export default TripPage;

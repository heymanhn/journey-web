'use strict';

import React, { Component, PropTypes } from 'react';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import TripPageIdeasList from './TripPageIdeasList';
import { viewTripsPage } from '../actions/navigation';

class TripPage extends Component {
  componentWillMount() {
    const { tripId } = this.props.params;
    const { onGetTrip } = this.props;

    // Fetch the trip from the server upon load
    onGetTrip(tripId);
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
          <Col md={12}>
            <h1>Trip page</h1>
            <p>Name: {trip.title}</p>
            <p>Destination: {trip.destination && trip.destination.name}</p>
            <p>Visibility: {trip.visibility}</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <TripPageIdeasList ideas={trip.ideas} />
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

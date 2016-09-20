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
    const {
      error,
      onAddIdeaPress,
      onEnterIdea,
      onIdeaCleared,
      resetIdeaBox,
      trip
    } = this.props;

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
            <h1>{trip.title}</h1>
            <p>Destination: {trip.destination && trip.destination.name}</p>
            <p>Visibility: {trip.visibility}</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <TripPageIdeasList
              ideas={trip.ideas}
              destination={trip.destination}
              onAddIdeaPress={onAddIdeaPress}
              onEnterIdea={onEnterIdea}
              onIdeaCleared={onIdeaCleared}
              resetIdeaBox={resetIdeaBox}
            />
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
  onAddIdeaPress: PropTypes.func.isRequired,
  onEnterIdea: PropTypes.func.isRequired,
  onGetTrip: PropTypes.func.isRequired,
  onIdeaCleared: PropTypes.func.isRequired,
  resetIdeaBox: PropTypes.bool.isRequired,
  trip: PropTypes.object
};

export default TripPage;

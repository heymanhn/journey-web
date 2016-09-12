'use strict';

import React, { Component, PropTypes } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Button from './Button';
import { viewTripsPage } from '../actions/navigation';

class TripPage extends Component {
  constructor(props) {
    super(props);

    this.props.onClearTripsError();
    this.state = {
      trip: {}
    };
  }

  componentWillMount() {
    const { tripId } = this.props.params;
    const { onGetTrip, onNoTripFound, trip, trips } = this.props;

    // If trips array is not present, fetch the trip from the server
    if (trips.length > 0) {
      const tripFromTrips = trips.find(trip => (trip._id === tripId));
      if (tripFromTrips) {
        this.setState({ trip: tripFromTrips });
      } else {
        onGetTrip(tripId);
      }
    } else {
      if (trip && trip._id === tripId) {
        this.setState({ trip });
      } else {
        onGetTrip(tripId);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { trip } = nextProps;
    if (trip && trip._id) {
      this.setState({ trip });
    }
  }

  render() {
    const { error } = this.props;
    const { trip } = this.state;

    if (error) {
      return (
        <div>{error}</div>
      );
    }

    if (trip && !trip._id) {
      return null;
    }

    const tripIdeas = trip.ideas.map(idea => {
      return (
        <div key={idea._id}>
          <p>Name: {idea.name}</p>
          <p>Comment: {idea.comment}</p>
        </div>
      );
    });

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
            <p>Ideas:</p>
            <div>{tripIdeas}</div>
          </Col>
          <Col md={8}>
            <p>Plan:</p>
            <div>{tripPlan}</div>
            <Button label="Home" onClick={viewTripsPage} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

TripPage.propTypes = {
  error: PropTypes.string,
  onClearTripsError: PropTypes.func.isRequired,
  onGetTrip: PropTypes.func.isRequired,
  onNoTripFound: PropTypes.func.isRequired,
  trip: PropTypes.object,
  trips: PropTypes.array
};

export default TripPage;

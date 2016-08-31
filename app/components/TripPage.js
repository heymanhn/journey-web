'use strict';

import React, { Component, PropTypes } from 'react';
import Button from './Button';
import { viewTripsPage } from '../actions/navigation';

class TripPage extends Component {
  findTripById(tripId) {
    return this.props.trips.find(trip => (trip._id === tripId));
  }

  render() {
    const trip = this.findTripById(this.props.params.tripId);

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
      <div>
        <h1>Trip page</h1>
        <p>Name: {trip.title}</p>
        <p>Destination: {trip.destination.name}</p>
        <p>Visibility: {trip.visibility}</p>
        <p>Ideas:</p>
        <div>{tripIdeas}</div>
        <p>Plan:</p>
        <div>{tripPlan}</div>
        <Button label="Home" onClick={viewTripsPage} />
      </div>
    );
  }
}

TripPage.propTypes = {
  trips: PropTypes.array.isRequired
};

export default TripPage;

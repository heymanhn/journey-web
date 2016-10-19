'use strict';

import React, { Component, PropTypes } from 'react';
import LoadingAnimation from './LoadingAnimation';
import Navigation from 'app/containers/Navigation';
import TripIdeas from 'app/containers/TripIdeas';
import TripMap from 'app/containers/TripMap';
import TripDetails from 'app/containers/TripDetails';
import TripIdeaSettings from 'app/containers/TripIdeaSettings';
import TripSettings from 'app/containers/TripSettings';
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
    const {
      error,
      trip
    } = this.props;

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

    return (
      <div>
        <div
          id="leftColumn"
          style={styles.leftColumn}
        >
          <Navigation />
          <TripDetails />
          <TripIdeas />
        </div>
        <TripMap />
        <TripSettings />
        <TripIdeaSettings />
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
  leftColumn: {
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 20px",
    float: "left",
    height: "100%",
    overflow: "scroll",
    position: "absolute",
    width: dimensions.leftColumn.width,
    zIndex: 2
  }
};

export default TripPage;

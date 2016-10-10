'use strict';

import React, { Component, PropTypes } from 'react';
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

    const titles = (
      <div style={styles.titles}>
        <h1 style={styles.h1}>{trip.title}</h1>
        <p>Destination: {trip.destination && trip.destination.name}</p>
        <p>Visibility: {trip.visibility}</p>
      </div>
    );

    return (
      <div>
        <div
          id="leftColumn"
          style={styles.leftColumn}
        >
          <div style={styles.navigationBar}>
            <Navigation />
          </div>
          <div style={styles.titleSection}>
            {titles}
          </div>
          <div style={styles.ideasSection}>
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
    fontSize: 36,
    marginTop: 0,
    paddingTop: 20
  },
  ideasSection: {
    padding: "0 " + dimensions.leftColumn.sidePadding + " 0"
  },
  leftColumn: {
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 20px",
    float: "left",
    height: "100%",
    overflow: "scroll",
    position: 'absolute',
    width: dimensions.leftColumn.width,
    zIndex: 2
  },
  loadingText: {
    color: "#333333",
    fontFamily: "Arial",
    fontSize: 24,
    textAlign: "center",
    margin: 20
  },
  navigationBar: {
    position: "fixed",
    zIndex: 1
  },
  titles: {
  },
  titleSection: {
    marginTop: dimensions.navigationBar.height,
    padding: "0 " + dimensions.leftColumn.sidePadding + " 0"
  }
};

export default TripPage;

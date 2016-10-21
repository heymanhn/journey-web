  'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Footer from './Footer';
import Navigation from 'app/containers/Navigation';
import TripsList from './TripsList';
import TripSettings from 'app/containers/TripSettings';
import { viewLandingPage } from 'app/actions/navigation';
import { dimensions } from 'app/constants';

class TripsPage extends Component {
  componentWillMount() {
    if (!this.props.user) {
      viewLandingPage();
    }
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.trackPageView();
    }
  }

  render() {
    const {
      user,
      onCreateTripPress,
      onDeleteTripPress,
      onViewTrip,
      trips
    } = this.props;

    if (!user) {
      return null;
    }

    return (
      <div>
        <Navigation fullWidth />
        <div style={styles.mainContainer}>
          <div style={styles.mainSection}>
            <div style={styles.headerSection}>
              <h1 style={styles.h1}>My Trips</h1>
              <Button
                onClick={onCreateTripPress}
                style={styles.newTripButton}
              >
                <img
                  src="../assets/new-trip-icon.png"
                  style={styles.newTripIcon}
                />
                <span style={styles.newTripTitle}>New Trip</span>
              </Button>
            </div>
            <TripsList
              trips={trips}
              onDeleteTripPress={onDeleteTripPress}
              onViewTrip={onViewTrip}
            />
            <TripSettings action="create" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

TripsPage.propTypes = {
  onCreateTripPress: PropTypes.func.isRequired,
  onDeleteTripPress: PropTypes.func.isRequired,
  onViewTrip: PropTypes.func.isRequired,
  trackPageView: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired,
  user: PropTypes.object
};

const styles = {
  h1: {
    fontWeight: 400,
    margin: 0
  },
  headerSection: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0px"
  },
  mainContainer: {
    backgroundColor: "#f9f9f9",
    marginTop: 60,
    paddingBottom: 30,
    width: "100%"
  },
  mainSection: {
    margin: "0px auto",
    maxWidth: dimensions.tripsPage.width,
    padding: 30,
    paddingBottom: 0
  },
  newTripButton: {
    backgroundColor: "1a76c8",
    borderRadius: 25,
    color: "white",
    padding: "8px 15px"
  },
  newTripIcon: {
    marginRight: 8
  },
  newTripTitle: {
    position: "relative",
    top: 1
  }
};

export default TripsPage;

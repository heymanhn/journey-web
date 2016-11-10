  'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import LoadingAnimation from './LoadingAnimation';
import TripsList from './TripsList';
import DeleteModal from './DeleteModal';
import TripSettings from 'app/containers/TripSettings';
import { colors, dimensions } from 'app/constants';

class TripsPage extends Component {
  componentWillMount() {
    const { onGetTrips, trips } = this.props;
    if (!trips) {
      onGetTrips();
    }
  }

  componentDidMount() {
    this.props.trackPageView();
  }

  render() {
    const {
      error,
      isFetching,
      onCreateTripPress,
      onDeleteTrip,
      onHide,
      showModal,
      trips
    } = this.props;

    if (!trips) {
      return (
        <div style={styles.mainContainer}>
          <div style={styles.mainSection}>
            <LoadingAnimation element="Trips" />
          </div>
        </div>
      );
    }

    const createTripPlaceholder = (
      <div
        onClick={onCreateTripPress}
        style={styles.placeholderContainer}
      >
        <img
          src="../assets/create-trip-placeholder-logo.png"
          style={styles.placeholderImage}
        />
        <div style={styles.placeholderText}>Create your first trip</div>
      </div>
    );
    const tripsList = <TripsList trips={trips} />;

    return (
      <div>
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
            {trips.length === 0 ? createTripPlaceholder : tripsList}
            <TripSettings action="create" />
            <DeleteModal
              contentTitle={this.getTripTitleToDelete()}
              error={error}
              isFetching={isFetching}
              modalTitle="Delete Trip"
              onHide={onHide}
              onDelete={onDeleteTrip}
              showModal={showModal}
            />
          </div>
        </div>
      </div>
    );
  }

  getTripTitleToDelete() {
    const { trips, tripToDelete } = this.props;

    if (!tripToDelete) {
      return null;
    }

    const trip = trips.find(t => t._id === tripToDelete);
    return trip ? trip.title : '';
  }
}

TripsPage.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  onCreateTripPress: PropTypes.func.isRequired,
  onDeleteTrip: PropTypes.func.isRequired,
  onGetTrips: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  trackPageView: PropTypes.func.isRequired,
  trips: PropTypes.array,
  tripToDelete: PropTypes.string
};

const styles = {
  h1: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 300,
    margin: 0
  },
  headerSection: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0px"
  },
  mainContainer: {
    marginTop: 60,
    paddingBottom: 30,
    width: "100%"
  },
  mainSection: {
    margin: "0px auto",
    minHeight: 600,
    maxWidth: dimensions.centeredPage.width,
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
  },
  placeholderContainer: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    borderRadius: 5,
    color: colors.textPrimary,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    fontSize: 28,
    fontWeight: 300,
    height: dimensions.tripsPage.listItem.height,
    justifyContent: "center",
    margin: "15px 0px",
    textAlign: "center",
    width: dimensions.tripsPage.listItem.width
  },
  placeholderImage: {
    position: "relative",
    left: 5
  },
  placeholderText: {
    letterSpacing: 0.5,
    margin: "10px 60px 0px"
  }
};

export default TripsPage;

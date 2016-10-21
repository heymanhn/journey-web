  'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Navigation from 'app/containers/Navigation';
import TripsList from './TripsList';
import TripSettings from 'app/containers/TripSettings';
import { viewLandingPage } from 'app/actions/navigation';

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
      onLogoutPress,
      onViewTrip,
      trips
    } = this.props;

    if (!user) {
      return null;
    }

    return (
      <div>
        <Navigation fullWidth />
        <div style={styles.mainSection}>
          <h1>Trips page</h1>
          <p>Welcome, {user.name}!</p>
          <Button
            bsStyle="primary"
            onClick={onCreateTripPress}
          >
            Create Trip
          </Button>
          <TripsList
            trips={trips}
            onDeleteTripPress={onDeleteTripPress}
            onViewTrip={onViewTrip}
          />
          <Button
            bsStyle="primary"
            onClick={onLogoutPress}
          >
            Log Out
          </Button>
          <TripSettings action="create" />
        </div>
      </div>
    );
  }
}

TripsPage.propTypes = {
  onCreateTripPress: PropTypes.func.isRequired,
  onDeleteTripPress: PropTypes.func.isRequired,
  onLogoutPress: PropTypes.func.isRequired,
  onViewTrip: PropTypes.func.isRequired,
  trackPageView: PropTypes.func.isRequired,
  trips: PropTypes.array.isRequired,
  user: PropTypes.object
};

const styles = {
  mainSection: {
    backgroundColor: "#eeeeee",
    margin: "60px auto 0px",
    maxWidth: 700
  }
};

export default TripsPage;

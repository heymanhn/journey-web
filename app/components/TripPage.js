'use strict';

import React, { Component, PropTypes } from 'react';
import LoadingAnimation from './LoadingAnimation';
import { viewTripPage } from 'app/actions/navigation';
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
    const { onGetTrip, params, trip } = this.props;

    // Fetch the trip from the server upon load if needed
    if (!trip || params.tripId !== trip._id) {
      onGetTrip();
    }
  }

  render() {
    const {
      error,
      params,
      trip
    } = this.props;
    const loadTrip = trip && params.tripId === trip._id;

    if (error) {
      return (
        <div>{error}</div>
      );
    }

    return (
      <div>
        <div
          id="leftColumn"
          style={styles.leftColumn}
        >
          <Navigation
            customWidth
            redirect={viewTripPage.bind(null, params.tripId)}
            style={styles.navigationBar}
          />
          {loadTrip ? (
            <div>
              <TripDetails />
              <TripIdeas />
              <TripSettings action="update" />
              <TripIdeaSettings />
            </div>
          ) : (
            <div style={styles.loader}>
              <LoadingAnimation element="Trip" />
            </div>
          )}
        </div>
        {loadTrip && <TripMap />}
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
  },
  loader: {
    marginTop: 100
  },
  navigationBar: {
    width: dimensions.leftColumn.width
  }
};

export default TripPage;

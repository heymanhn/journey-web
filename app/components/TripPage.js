'use strict';

require('../stylesheets/trip-page.css');

import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import LoadingAnimation from './LoadingAnimation';
import { viewTripPage } from 'app/actions/navigation';
import ErrorMessage from './ErrorMessage';
import Navigation from 'app/containers/Navigation';
import TripIdeas from 'app/containers/TripIdeas';
import TripMap from 'app/containers/TripMap';
import TripDetails from 'app/containers/TripDetails';
import TripIdeaSettings from 'app/containers/TripIdeaSettings';
import TripSettings from 'app/containers/TripSettings';
import { dimensions, transitions } from 'app/constants';

class TripPage extends Component {
  componentDidMount() {
    this.props.trackPageView();
  }

  componentWillMount() {
    const { onGetTrip, params, trip } = this.props;
    document.body.style.backgroundColor = "white";

    // Fetch the trip from the server upon load if needed
    if (!trip || params.tripId !== trip._id) {
      onGetTrip();
    }
  }

  componentWillUnmount() {
    this.props.onClearTripError();
    document.body.style.backgroundColor = null;
  }

  componentWillReceiveProps(nextProps) {
    const { error, onClearTripError, params, trip } = nextProps;

    if (error) {
      const tripLoaded = trip && params.tripId === trip._id;
      tripLoaded && setTimeout(onClearTripError, 5000);
    }
  }

  render() {
    const { error, params, trip } = this.props;
    const tripLoaded = trip && params.tripId === trip._id;

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
          <div style={styles.mainContainer}>
            <ReactCSSTransitionGroup
              transitionName="error"
              transitionAppear={true}
              transitionAppearTimeout={transitions.landingPageFrame}
              transitionEnterTimeout={transitions.tripPageError.enter}
              transitionLeaveTimeout={transitions.tripPageError.leave}
            >
              {error && (
                <ErrorMessage error={error} style={styles.errorMessage} />
              )}
            </ReactCSSTransitionGroup>
            {tripLoaded ? (
              <div>
                <TripDetails />
                <TripIdeas />
                <TripSettings action="update" />
                <TripIdeaSettings />
              </div>
            ) : (!error && (
              <div style={styles.loader}>
                <LoadingAnimation element="Trip" />
              </div>
            ))}
          </div>
        </div>
        {tripLoaded && <TripMap />}
      </div>
    );
  }
}

TripPage.propTypes = {
  error: PropTypes.string,
  onClearTripError: PropTypes.func.isRequired,
  onGetTrip: PropTypes.func.isRequired,
  trackPageView: PropTypes.func.isRequired,
  trip: PropTypes.object
};

const styles = {
  errorMessage: {
    position: "fixed",
    padding: "7px " + dimensions.sidePadding + "px",
    width: dimensions.leftColumn.width
  },
  leftColumn: {
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.3) 0px 0px 20px",
    float: "left",
    height: "100%",
    overflow: "scroll",
    position: "absolute",
    width: dimensions.leftColumn.width,
    zIndex: 1
  },
  loader: {
    marginTop: 100
  },
  mainContainer: {
    marginTop: dimensions.navigationBar.height
  },
  navigationBar: {
    width: dimensions.leftColumn.width
  }
};

export default TripPage;

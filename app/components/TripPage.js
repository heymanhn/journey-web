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
    const { onUpdatePageHeight, trackPageView } = this.props;
    window.addEventListener('resize', onUpdatePageHeight);
    trackPageView();
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
      this.isTripLoaded() && setTimeout(onClearTripError, 5000);
    }
  }

  render() {
    const { error, params, trip } = this.props;

    return (
      <div>
        <Navigation
          customContainerStyle={styles.navContainerStyle}
          customNavStyle={styles.navStyle}
          redirect={viewTripPage.bind(null, params.tripId)}
          style={styles.navigationBar}
        />
        <div style={styles.leftColumn}>
          <div style={styles.transparentHeader}/>
          <div style={this.loadMainContainerStyle()}>
            <div style={this.loadMainContentStyle()}>
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
              {this.isTripLoaded() ? (
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
            <div style={styles.gradientShadow} />
            <div style={styles.whitespaceFooter}/>
          </div>
        </div>
        {this.isTripLoaded() && <TripMap />}
      </div>
    );
  }

  isTripLoaded() {
    const { params, trip } = this.props;
    return trip && params.tripId === trip._id;
  }

  loadMainContainerStyle() {
    const { pageHeight } = this.props;
    const { mainContainer } = styles;
    let height;

    if (this.isTripLoaded()) {
      height = pageHeight - (40 + dimensions.navigationBar.height);
    } else {
      height = 200;
    }
    // Set the height of the container, minus the existing padding
    return { ...mainContainer, height };
  }

  loadMainContentStyle() {
    const { pageHeight } = this.props;
    const { mainContent } = styles;
    let height;

    if (this.isTripLoaded()) {
      height = pageHeight - (55 + dimensions.navigationBar.height);
    } else {
      height = 200;
    }

    // Set the height of the container, minus the existing padding
    return { ...mainContent, height };
  }
}

TripPage.propTypes = {
  error: PropTypes.string,
  onClearTripError: PropTypes.func.isRequired,
  onGetTrip: PropTypes.func.isRequired,
  onUpdatePageHeight: PropTypes.func.isRequired,
  pageHeight: PropTypes.number,
  trackPageView: PropTypes.func.isRequired,
  trip: PropTypes.object
};

const styles = {
  errorMessage: {
    position: "fixed",
    padding: "7px " + dimensions.sidePadding + "px",
    top: 80,
    width: dimensions.leftColumn.width
  },
  gradientShadow: {
    background: "linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1))",
    height: 5,
    position: "relative",
    top: -4
  },
  leftColumn: {
    backgroundColor: "rgba(0,0,0,0)",
    float: "left",
    height: "100%",
    left: 20,
    position: "absolute",
    width: dimensions.leftColumn.width,
    zIndex: 2
  },
  loader: {
    marginTop: 70
  },
  mainContainer: {
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    boxShadow: "rgba(0, 0, 0, 0.1) 3px 3px 8px," +
      "rgba(0, 0, 0, 0.1) -3px 3px 8px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
    top: dimensions.navigationBar.height
  },
  mainContent: {
    overflow: "scroll",
    position: "relative"
  },
  navContainerStyle: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    boxShadow: "rgba(0, 0, 0, 0.1) 3px -3px 8px," +
      "rgba(0, 0, 0, 0.1) -3px -3px 8px," +
      "rgba(0, 0, 0, 0.1) 3px 3px 8px," +
      "rgba(0, 0, 0, 0.1) -3px 3px 8px",
    left: 20,
    top: 20,
    width: dimensions.leftColumn.width
  },
  navStyle: {
    width: dimensions.leftColumn.width
  },
  transparentHeader: {
    height: 20
  },
  whitespaceFooter: {
    height: 10
  }
};

export default TripPage;

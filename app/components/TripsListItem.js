'use strict';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import TripsListItemLabel from './TripsListItemLabel';
import {
  dimensions,
  generateMapImage,
  getZoomLevel,
  mapbox
} from 'app/constants';

class TripsListItem extends Component {
  render() {
    const { onDeleteTripPress, trip } = this.props;

    return (
      <Link
        activeStyle={styles.vanillaLink}
        style={styles.vanillaLink}
        to={`/trips/${trip._id}`}
      >
        <div style={styles.container}>
          <div
            style={this.loadBackgroundMapStyle()}
          >
            <div style={styles.labelsSection}>
              <TripsListItemLabel
                label={trip.destination.name}
                type="destination"
              />
              <TripsListItemLabel
                label={trip.ideas.length.toString()}
                type="ideas"
              />
            </div>
          </div>

          <div style={styles.tripTitle}>
            {trip.title}
          </div>
        </div>
      </Link>
    );
  }

  loadBackgroundMapStyle() {
    const { loc: { coordinates }, viewport } = this.props.trip.destination;
    const { mapContainer } = styles;

    let imageURL = generateMapImage(...coordinates, getZoomLevel(viewport));
    return { ...mapContainer, backgroundImage: "url('" + imageURL + "')" };
  }
}

TripsListItem.propTypes = {
  onDeleteTripPress: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};

const styles = {
  container: {
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    borderRadius: 5,
    display: "flex",
    flexDirection: "column",
    height: dimensions.tripsPage.listItem.height,
    margin: "15px 0px",
    width: dimensions.tripsPage.listItem.width
  },
  labelsSection: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: 10
  },
  mapContainer: {
    alignItems: "flex-end",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    display: "flex",
    height: mapbox.staticImage.height,
    justifyContent: "center",
    width: mapbox.staticImage.width
  },
  tripTitle: {
    color: "#333333",
    fontSize: 18,
    fontWeight: 300,
    letterSpacing: 0.5,
    padding: "20px 15px 0px",
    textAlign: "center"
  },
  vanillaLink: {
    textDecoration: "none"
  }
};

export default TripsListItem;

'use strict';

require('app/stylesheets/mapbox-gl.css');

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
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
      <div style={styles.container}>
        <Link
          activeStyle={styles.vanillaLink}
          style={styles.vanillaLink}
          to={`/trips/${trip._id}`}
        >
          <div
            style={this.loadBackgroundMapStyle()}
          ></div>
          <div style={styles.tripTitle}>
            {trip.title}
          </div>
        </Link>
      </div>
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
    height: dimensions.tripsPage.listItem.height,
    margin: "15px 0px",
    width: dimensions.tripsPage.listItem.width
  },
  mapContainer: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    height: mapbox.staticImage.height,
    width: mapbox.staticImage.width
  },
  tripTitle: {
    color: "#333333",
    fontSize: 18,
    fontWeight: 300,
    letterSpacing: 0.5,
    padding: "25px 20px 20px",
    textAlign: "center"
  },
  vanillaLink: {
    textDecoration: "none"
  }
};

export default TripsListItem;

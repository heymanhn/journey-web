'use strict';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';
import TripsListItemLabel from './TripsListItemLabel';
import {
  dimensions,
  generateMapImage,
  getZoomLevel,
  mapbox
} from 'app/constants';

class TripsListItemUI extends Component {
  render() {
    const {
      onClearHoverOverTrip,
      onHoverOverTrip,
      onShowDeleteTripModal,
      onViewTrip,
      trip
    } = this.props;

    const removeButton = (
      <div
        onClick={onShowDeleteTripModal}
        style={this.loadRemoveButtonStyle()}
      >
        <Glyphicon
          glyph="remove-circle"
          style={styles.removeButton.glyph}
        />
      </div>
    )

    return (
        <div
          onClick={onViewTrip}
          onMouseLeave={onClearHoverOverTrip}
          onMouseOver={onHoverOverTrip}
          style={styles.container}
        >
          <div style={this.loadBackgroundMapStyle()}>
            {removeButton}
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
          <Link
            activeStyle={styles.vanillaLink}
            style={styles.vanillaLink}
            to={`/trips/${trip._id}`}
          >
            <div style={styles.tripTitle}>
              {trip.title}
            </div>
          </Link>
        </div>
    );
  }

  loadBackgroundMapStyle() {
    const { hoverTripId, trip } = this.props;
    const { loc: { coordinates }, viewport } = trip.destination;
    let { mapContainer } = styles;
    let imageURL = generateMapImage(...coordinates, getZoomLevel(viewport));

    if (hoverTripId === trip._id) {
      mapContainer.justifyContent = "space-between";
    } else {
      mapContainer.justifyContent = "flex-end";
    }

    return { ...mapContainer, backgroundImage: "url('" + imageURL + "')" };
  }

  loadRemoveButtonStyle() {
    const style = styles.removeButton.div;
    const { hoverTripId, trip: { _id: tripId } } = this.props;
    return hoverTripId === tripId ? {...style, display: "block" } : style;
  }
}

TripsListItemUI.propTypes = {
  hoverTripId: PropTypes.string,
  onClearHoverOverTrip: PropTypes.func.isRequired,
  onHoverOverTrip: PropTypes.func.isRequired,
  onShowDeleteTripModal: PropTypes.func.isRequired,
  onViewTrip: PropTypes.func.isRequired,
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
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    height: mapbox.staticImage.height,
    width: mapbox.staticImage.width
  },
  removeButton: {
    div: {
      alignSelf: "flex-end",
      backgroundColor: "#ffffff",
      borderRadius: 25,
      cursor: "pointer",
      display: "none",
      left: 10,
      position: "relative",
      top: -10
    },
    glyph: {
      color: "#333333",
      fontSize: 26,
    }
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

export default TripsListItemUI;

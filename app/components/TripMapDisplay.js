'use strict';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { Component, PropTypes } from 'react';
import { mapbox } from '../constants';

class TripMapDisplay extends Component {
  componentDidMount() {
    // Initialize the map and set it to the viewport of the destination
    const { destination } = this.props;
    mapboxgl.accessToken = mapbox.token;

    const map = new mapboxgl.Map({
      container: this.container,
      style: mapbox.streetsStyle,
      attributionControl: true,
      center: destination.loc.coordinates,
    });

    const { southwest, northeast } = destination.viewport;
    const bounds = new mapboxgl.LngLatBounds(
      southwest.coordinates,
      northeast.coordinates
    );
    map.fitBounds(bounds, {
      linear: true
    });
  }

  render() {
    const { destination, ideas } = this.props;

    return (
      <div
        ref={x => this.container = x}
        style={styles.mapContainer}
      ></div>
    );
  }
}

TripMapDisplay.propTypes = {
  destination: PropTypes.object,
  ideas: PropTypes.array
};

const styles = {
  mapContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%'
  }
};

export default TripMapDisplay;

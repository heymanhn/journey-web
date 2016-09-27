'use strict';

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { Component, PropTypes } from 'react';
import { mapbox } from '../constants';

class TripMapDisplay extends Component {
  componentDidMount() {
    const { destination } = this.props;
    mapboxgl.accessToken = mapbox.token;

    const map = new mapboxgl.Map({
      container: this.container,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: destination.loc.coordinates,
      zoom: 9
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

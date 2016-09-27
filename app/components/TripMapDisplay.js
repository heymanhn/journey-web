'use strict';

require('../stylesheets/mapbox-gl.css');

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { Component, PropTypes } from 'react';
import { mapbox } from '../constants';

class TripMapDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
    };
  }

  componentDidMount() {
    this.loadMap();
    this.loadMarkers();
  }

  // Update the map markers if there are any changes
  componentWillReceiveProps(nextProps) {
    this.loadMarkers(nextProps);
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

  loadMap() {
    // Initialize the map and set it to the viewport of the destination
    const { destination } = this.props;
    mapboxgl.accessToken = mapbox.token;

    this.map = new mapboxgl.Map({
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

    this.map.fitBounds(bounds, {
      linear: true
    });

    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.Navigation());
  }

  loadMarkers(props) {
    let { markers } = this.state;
    const { ideas } = props || this.props;

    if (markers.length === ideas.length) {
      return;
    }

    // Remove all previous markers
    markers.forEach((marker) => {
      marker.remove();
    });
    markers = [];

    // Add markers corresponding to the ideas
    ideas.forEach((idea) => {
      let marker = document.createElement('div');
      marker.className = 'marker';

      let mapMarker = new mapboxgl.Marker(marker)
        .setLngLat(idea.loc.coordinates)
        .addTo(this.map);

      markers.push(mapMarker);
      this.setState({ markers });
    });
  }
}

TripMapDisplay.propTypes = {
  destination: PropTypes.object,
  ideas: PropTypes.array
};

const styles = {
  mapContainer: {
    paddingLeft: 400,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    zIndex: 1
  }
};

export default TripMapDisplay;

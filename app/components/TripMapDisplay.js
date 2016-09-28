'use strict';

require('../stylesheets/mapbox-gl.css');

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { Component, PropTypes } from 'react';
import { mapbox, mapMarkers } from '../constants';

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
    let { hoverMarker, markers } = this.state;
    const { ideas, mouseOverIdea } = props || this.props;

    // Remove all previous markers
    markers.forEach((marker) => {
      marker.remove();
    });
    markers = [];

    if (hoverMarker) {
      hoverMarker.remove();
      hoverMarker = null;
    }

    // Add markers corresponding to the ideas
    ideas.forEach((idea) => {
      let marker = document.createElement('div');
      marker.className = 'marker';
      marker.style.width = mapMarkers.diameter;
      marker.style.height= mapMarkers.diameter;
      marker.addEventListener('mouseover', () => mapMarker.togglePopup());
      marker.addEventListener('mouseout', () => mapMarker.togglePopup());
      marker.addEventListener('click', () => mapMarker.togglePopup());

      let mapMarker = new mapboxgl.Marker(
        marker,
        { offset: [-mapMarkers.diameter/2, -mapMarkers.diameter/2] }
      )
        .setLngLat(idea.loc.coordinates)
        .addTo(this.map);

      // Add popup UI to marker
      let popupHTML = '';
      if (idea.photo) {
        popupHTML += `<img src="${idea.photo}">`;
      }

      popupHTML += `
        <p class="popup-name">${idea.name}</p>
        <p class="popup-address">${idea.address}</p>`;

      if (idea.comment) {
        popupHTML += `<p class="popup-comment">${idea.comment}</p>`
      }

      let popup = new mapboxgl.Popup({
        offset: [mapbox.displayOffset, 0],
        closeButton: false
      }).setHTML(popupHTML);
      mapMarker.setPopup(popup);

      // Display the hover marker if needed
      if (mouseOverIdea && mouseOverIdea === idea._id) {
        let newHover = document.createElement('div');
        newHover.className = 'hover-marker';
        newHover.style.backgroundImage = 'url("../assets/marker-icon.png")';
        newHover.style.width = mapMarkers.icon.width;
        newHover.style.height = mapMarkers.icon.height;

        hoverMarker = new mapboxgl.Marker(
          newHover,
          { offset: [-mapMarkers.icon.width/2, -mapMarkers.icon.height] }
        )
          .setLngLat(idea.loc.coordinates)
          .addTo(this.map);
      }

      markers.push(mapMarker);
      this.setState({ hoverMarker, markers });
    });
  }
}

TripMapDisplay.propTypes = {
  destination: PropTypes.object,
  ideas: PropTypes.array,
  mouseOverIdea: PropTypes.string.isRequired
};

const styles = {
  mapContainer: {
    paddingLeft: mapbox.displayOffset,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%',
    zIndex: 1
  }
};

export default TripMapDisplay;

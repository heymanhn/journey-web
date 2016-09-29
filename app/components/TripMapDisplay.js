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
    const { focusedMarker } = this.state;
    const { focusedIdea } = nextProps;
    this.loadMarkers(nextProps);

    // Focus the map if it's not already focused
    if (focusedIdea && !focusedMarker) {
      this.focusMapOnIdea(focusedIdea);
    }
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
    let { focusedMarker, hoverMarker, markers } = this.state;
    const {
      focusedIdea,
      ideas,
      mouseOverIdea,
      onClearFocusedIdea
    } = props || this.props;

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
      marker.addEventListener('click', (() => {
        mapMarker.togglePopup();
        this.flyToLocation(idea.loc.coordinates);
      }).bind(this));

      let mapMarker = new mapboxgl.Marker(
        marker,
        { offset: [-mapMarkers.diameter/2, -mapMarkers.diameter/2] }
      )
        .setLngLat(idea.loc.coordinates)
        .addTo(this.map);

      // Add popup UI to marker
      mapMarker.setPopup(createPopup(idea));

      // Display the hover marker if specified
      if (mouseOverIdea && mouseOverIdea === idea._id) {
        /*
         * If a different idea from the previously focused idea is hovered over,
         * clear the focused hover marker, so that there is always at most
         * one hover marker visible on the map
         */
        if (focusedMarker && (mouseOverIdea !== focusedIdea)) {
          focusedMarker.remove();
          focusedMarker = null;
          onClearFocusedIdea();
        }

        hoverMarker = new mapboxgl.Marker(
          createHoverMarkerElement(),
          { offset: [-mapMarkers.icon.width/2, -mapMarkers.icon.height] }
        )
          .setLngLat(idea.loc.coordinates)
          .addTo(this.map);
      }

      markers.push(mapMarker);
      this.setState({ focusedMarker, hoverMarker, markers });
    });
  }

  focusMapOnIdea(focusedIdeaId) {
    const { ideas, onClearFocusedIdea } = this.props;
    const index = ideas.findIndex((idea) => idea._id === focusedIdeaId);

    // Don't do anything if the idea isn't found
    if (index < 0) {
      onClearFocusedIdea();
      return;
    }

    const marker = this.state.markers[index];
    const lngLat = marker.getLngLat();

    let focusedMarker = new mapboxgl.Marker(
      createHoverMarkerElement(true),
      { offset: [-mapMarkers.icon.width/2, -mapMarkers.icon.height] }
    )
      .setLngLat(lngLat)
      .addTo(this.map);

    this.flyToLocation(lngLat);
    this.setState({ focusedMarker });
  }

  flyToLocation(lngLat) {
    this.map.flyTo({
      center: lngLat,
      zoom: 15,
      curve: 1,
      easing: (t) => t<.5 ? 2*t*t : -1+2*(2-t)*t  // easeInOutQuad
    });
  }
}

function createHoverMarkerElement(isFocused = false) {
  let newMarker = document.createElement('div');
  newMarker.className = 'hover-marker';
  newMarker.style.backgroundImage = isFocused ?
    'url("../assets/marker-icon-focus.png")' :
    'url("../assets/marker-icon.png")';
  newMarker.style.width = mapMarkers.icon.width;
  newMarker.style.height = mapMarkers.icon.height;

  return newMarker;
}

function createPopup(idea) {
  let popupHTML = idea.photo ? `<img src="${idea.photo}">` : '';
  popupHTML += `
    <p class="popup-name">${idea.name}</p>
    <p class="popup-address">${idea.address}</p>`;
  popupHTML += idea.comment ?
    `<p class="popup-comment">${idea.comment}</p>` : '';

  return new mapboxgl.Popup({
    offset: [0, 0],
    closeButton: false
  }).setHTML(popupHTML);
}

TripMapDisplay.propTypes = {
  destination: PropTypes.object,
  focusedIdea: PropTypes.string.isRequired,
  ideas: PropTypes.array,
  mouseOverIdea: PropTypes.string.isRequired,
  onClearFocusedIdea: PropTypes.func.isRequired
};

const styles = {
  mapContainer: {
    left: mapbox.displayOffset,
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: window.innerWidth - mapbox.displayOffset,
    zIndex: 1
  }
};

export default TripMapDisplay;

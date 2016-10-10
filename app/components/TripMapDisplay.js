'use strict';

require('app/stylesheets/mapbox-gl.css');

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { Component, PropTypes } from 'react';
import { calcMapWidth, dimensions, mapbox, mapMarkers } from 'app/constants';

class TripMapDisplay extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.updateMapWidth.bind(this));
    this.loadMap();
    this.loadMarkers();
    this.fitMapToMarkers(true);
  }

  // Update the map markers if there are any changes
  componentWillReceiveProps(newProps) {
    const { focusLngLat, ideas, hoverLngLat } = this.props;
    const {
      fitMapRequest,
      focusLngLat: newFocusLngLat,
      focusMarker,
      ideas: newIdeas,
      hoverLngLat: newHoverLngLat,
      onDeleteFocusMarker,
      onMapFitComplete
    } = newProps;

    if (newIdeas.length !== ideas.length) {
      this.loadMarkers(newProps);
    }

    if (newHoverLngLat !== hoverLngLat) {
      this.loadHoverMarker(newProps);
    }

    if (newFocusLngLat !== focusLngLat) {
      this.loadFocusMarker(newProps);
    }

    if (fitMapRequest) {
      this.fitMapToMarkers();
      onMapFitComplete();
    }
  }

  render() {
    const { destination, ideas } = this.props;

    return (
      <div
        ref={x => this.container = x}
        style={this.loadMapContainerStyle()}
      ></div>
    );
  }

  loadMap() {
    // Initialize the map and set it to the viewport of the destination
    mapboxgl.accessToken = mapbox.token;

    this.map = new mapboxgl.Map({
      container: this.container,
      style: mapbox.streetsStyle,
      attributionControl: true,
      center: this.props.destination.loc.coordinates,
    });

    // Add zoom and rotation controls to the map.
    this.map.addControl(new mapboxgl.Navigation());
  }

  loadMarkers(props) {
    const {
      ideas,
      markers,
      onSaveMarkers,
      trackIdeaView
    } = props || this.props;
    let newMarkers = [];

    // Remove all previous markers
    markers.forEach((marker) => marker.remove());

    // Create markers corresponding to the ideas
    ideas.forEach((idea) => {
      let markerElem = document.createElement('div');
      markerElem.className = 'marker';
      markerElem.style.width = markerElem.style.height = mapMarkers.diameter;
      markerElem.addEventListener('mouseover', () => marker.togglePopup());
      markerElem.addEventListener('mouseout', () => marker.togglePopup());
      markerElem.addEventListener('click', () => {
        marker.togglePopup();
        trackIdeaView(idea._id);
        this.flyToLocation(idea.loc.coordinates);
      });

      let marker = new mapboxgl.Marker(
        markerElem, { offset: [-mapMarkers.diameter/2, -mapMarkers.diameter/2] }
      )
        .setLngLat(idea.loc.coordinates)
        .addTo(this.map);

      marker.setPopup(createPopup(idea));
      newMarkers.push(marker);
    });

    onSaveMarkers(newMarkers);
  }

  createHoverMarker(lngLat, isFocusMarker = false) {
    const { onSaveFocusMarker, onSaveHoverMarker } = this.props;

    let markerElem = document.createElement('div');
    markerElem.className = 'hover-marker';
    markerElem.style.backgroundImage = isFocusMarker ?
      'url("../assets/marker-icon-focus.png")' :
      'url("../assets/marker-icon.png")';
    markerElem.style.width = mapMarkers.icon.width;
    markerElem.style.height = mapMarkers.icon.height;

    const marker = new mapboxgl.Marker(
      markerElem,
      { offset: [-mapMarkers.icon.width/2, -mapMarkers.icon.height] }
    )
      .setLngLat(lngLat)
      .addTo(this.map);

    isFocusMarker ? onSaveFocusMarker(marker) : onSaveHoverMarker(marker);
  }

  loadHoverMarker(props) {
    const {
      focusLngLat,
      focusMarker,
      hoverMarker,
      ideas,
      hoverLngLat,
      onClearFocusLngLat,
      onDeleteFocusMarker,
      onDeleteHoverMarker
    } = props;

    if (hoverMarker) {
      onDeleteHoverMarker(hoverMarker);
    }

    if (hoverLngLat && hoverLngLat !== focusLngLat) {
      focusLngLat && onClearFocusLngLat();
      this.createHoverMarker(hoverLngLat);
    }
  }

  createFocusMarker(lngLat) {
    this.createHoverMarker(lngLat, true);
  }

  loadFocusMarker(props) {
    const {
      focusMarker,
      focusLngLat,
      hoverMarker,
      ideas,
      onDeleteFocusMarker,
      onDeleteHoverMarker
    } = props;

    if (focusMarker) {
      onDeleteFocusMarker(focusMarker);
    }

    if (focusLngLat) {
      hoverMarker && onDeleteHoverMarker(hoverMarker);
      this.createFocusMarker(focusLngLat);
      this.flyToLocation(focusLngLat);
    }
  }

  flyToLocation(lngLat) {
    this.map.flyTo({
      center: lngLat,
      zoom: 15,
      curve: 1,
      easing: easeInOutQuad
    });
  }

  fitMapToMarkers(easeFit) {
    const { destination, ideas } = this.props;
    const { southwest, northeast } = destination.viewport;
    const bounds = new mapboxgl.LngLatBounds(
      southwest.coordinates,
      northeast.coordinates
    );

    // Ensure the bounds captures all the ideas' locations
    ideas.map((idea) => bounds.extend(idea.loc.coordinates));
    this.map.fitBounds(bounds, {
      linear: easeFit,
      padding: 100,
      curve: 1,
      speed: 2,
      easing: easeInOutQuad
    });
  }

  loadMapContainerStyle() {
    const { mapWidth: width } = this.props;

    return {
      left: dimensions.leftColumn.width,
      position: 'absolute',
      top: 0,
      bottom: 0,
      width,
      zIndex: 1
    };
  }

  updateMapWidth() {
    this.props.onUpdateMapWidth(calcMapWidth());
  }
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

function easeInOutQuad(t) {
  return t<.5 ? 2*t*t : -1+2*(2-t)*t;
}

TripMapDisplay.propTypes = {
  destination: PropTypes.object,
  fitMapRequest: PropTypes.bool,
  focusLngLat: PropTypes.array,
  focusMarker: PropTypes.object,
  hoverLngLat: PropTypes.array,
  hoverMarker: PropTypes.object,
  ideas: PropTypes.array,
  mapWidth: PropTypes.number.isRequired,
  markers: PropTypes.array.isRequired,
  onClearFocusLngLat: PropTypes.func.isRequired,
  onDeleteFocusMarker: PropTypes.func.isRequired,
  onDeleteHoverMarker: PropTypes.func.isRequired,
  onSaveFocusMarker: PropTypes.func.isRequired,
  onSaveHoverMarker: PropTypes.func.isRequired,
  onSaveMarkers: PropTypes.func.isRequired,
  onUpdateMapWidth: PropTypes.func.isRequired,
  trackIdeaView: PropTypes.func.isRequired
};

export default TripMapDisplay;

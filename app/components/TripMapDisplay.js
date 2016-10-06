'use strict';

require('app/stylesheets/mapbox-gl.css');

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { Component, PropTypes } from 'react';
import { mapbox, mapMarkers } from 'app/constants';

class TripMapDisplay extends Component {
  componentDidMount() {
    this.loadMap();
    this.loadMarkers();
    this.fitMapToMarkers();
  }

  // Update the map markers if there are any changes
  componentWillReceiveProps(newProps) {
    const { focusedIdea, ideas, mouseOverIdea } = this.props;
    const {
      focusedIdea: newFocusedIdea,
      ideas: newIdeas,
      mouseOverIdea: newMouseOverIdea
    } = newProps;

    if (newMouseOverIdea !== mouseOverIdea) {
      this.loadHoverMarker(newProps);
    }

    if (newIdeas.length !== ideas.length) {
      this.loadMarkers(newProps);
    }

    if (newFocusedIdea !== focusedIdea) {
      this.focusMapOnIdea(newProps);
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

  createHoverMarker(ideas, ideaId, isFocusMarker = false) {
    const {
      onDeleteFocusMarker,
      onDeleteHoverMarker,
      onSaveFocusMarker,
      onSaveHoverMarker
    } = this.props;

    const targetIdea = ideas.find((idea) => idea._id === ideaId);
    if (!targetIdea) {
      return isFocusMarker ? onDeleteFocusMarker() : onDeleteHoverMarker();
    }

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
      .setLngLat(targetIdea.loc.coordinates)
      .addTo(this.map);

    isFocusMarker ? onSaveFocusMarker(marker) : onSaveHoverMarker(marker);
  }

  loadHoverMarker(props) {
    const {
      focusedIdea,
      focusMarker,
      hoverMarker,
      ideas,
      mouseOverIdea,
      onClearFocusedIdea,
      onDeleteFocusMarker,
      onDeleteHoverMarker
    } = props;

    if (hoverMarker) {
      onDeleteHoverMarker(hoverMarker);
    }

    if (mouseOverIdea) {
      if (!focusedIdea) {
        this.createHoverMarker(ideas, mouseOverIdea);
      } else if (mouseOverIdea !== focusedIdea) {
        onDeleteFocusMarker(focusMarker);
        onClearFocusedIdea();
        this.createHoverMarker(ideas, mouseOverIdea);
      }
    }
  }

  createFocusMarker(ideas, ideaId) {
    this.createHoverMarker(ideas, ideaId, true);
  }

  fitMapToMarkers() {
    const { destination, ideas } = this.props;
    const { southwest, northeast } = destination.viewport;
    const bounds = new mapboxgl.LngLatBounds(
      southwest.coordinates,
      northeast.coordinates
    );

    // Ensure the bounds captures all the ideas' locations
    ideas.map((idea) => bounds.extend(idea.loc.coordinates));
    this.map.fitBounds(bounds, {
      linear: true,
      padding: 100,
      curve: 1,
      easing: easeInOutQuad
    });
  }

  focusMapOnIdea(props) {
    const {
      focusMarker,
      focusedIdea,
      hoverMarker,
      ideas,
      onDeleteFocusMarker,
      onDeleteHoverMarker
    } = props;

    if (focusMarker) {
      onDeleteFocusMarker(focusMarker);
    }

    if (focusedIdea) {
      onDeleteHoverMarker(hoverMarker);
      this.createFocusMarker(ideas, focusedIdea);

      const targetIdea = ideas.find((idea) => idea._id === focusedIdea);
      if (targetIdea) {
        this.flyToLocation(targetIdea.loc.coordinates);
      }
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
  focusMarker: PropTypes.object,
  hoverMarker: PropTypes.object,
  focusedIdea: PropTypes.string.isRequired,
  ideas: PropTypes.array,
  markers: PropTypes.array.isRequired,
  mouseOverIdea: PropTypes.string.isRequired,
  onClearFocusedIdea: PropTypes.func.isRequired,
  onDeleteFocusMarker: PropTypes.func.isRequired,
  onDeleteHoverMarker: PropTypes.func.isRequired,
  onSaveFocusMarker: PropTypes.func.isRequired,
  onSaveHoverMarker: PropTypes.func.isRequired,
  onSaveMarkers: PropTypes.func.isRequired,
  trackIdeaView: PropTypes.func.isRequired
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

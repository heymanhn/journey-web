'use strict';

require('app/stylesheets/mapbox-gl.css');

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { Component, PropTypes } from 'react';
import { mapbox, mapMarkers } from 'app/constants';

class TripMapDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.loadMap();
    this.loadMarkers();
    this.fitMapToMarkers();
  }

  // Update the map markers if there are any changes
  componentWillReceiveProps(nextProps) {
    const { focusedMarker } = this.state;
    const { focusedIdea: previousFocus, ideas: previousIdeas } = this.props;
    const { focusedIdea, ideas } = nextProps;

    if (ideas.length !== previousIdeas.length) {
      this.loadMarkers(nextProps);
    }

    // Focus the map if it's not already focused
    if (focusedIdea) {
      if (!focusedMarker) {
        return this.focusMapOnIdea(focusedIdea, nextProps);
      }

      if (focusedIdea !== previousFocus) {
        this.clearFocusMarker();
        this.focusMapOnIdea(focusedIdea, nextProps);
      }
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
    let { hoverMarker, focusedMarker } = this.state;
    const {
      // focusMarker,
      focusedIdea,
      // hoverMarker,
      ideas,
      markers,
      mouseOverIdea,
      onClearFocusedIdea,
      onSaveMarkers,
      trackIdeaView
    } = props || this.props;
    let newMarkers = [];

    // Remove all previous markers
    this.clearMarkers();

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
      marker.addEventListener('mouseover', () => newMarker.togglePopup());
      marker.addEventListener('mouseout', () => newMarker.togglePopup());
      marker.addEventListener('click', (() => {
        newMarker.togglePopup();
        trackIdeaView(idea._id);
        this.flyToLocation(idea.loc.coordinates);
      }).bind(this));

      let newMarker = new mapboxgl.Marker(
        marker,
        { offset: [-mapMarkers.diameter/2, -mapMarkers.diameter/2] }
      )
        .setLngLat(idea.loc.coordinates)
        .addTo(this.map);

      // Add popup UI to marker
      newMarker.setPopup(createPopup(idea));

      // Display the hover marker if specified
      if (mouseOverIdea && mouseOverIdea === idea._id) {
        if (focusedMarker) {
          /*
           * If a different idea from the previously focused idea is hovered
           * over, clear the focused hover marker, so that there is always at
           * mostone hover marker visible on the map
           */
          if (mouseOverIdea !== focusedIdea) {
            this.clearFocusMarker();
            onClearFocusedIdea();
            hoverMarker = this.createHoverMarker(idea.loc.coordinates);
          }
        } else {
          hoverMarker = this.createHoverMarker(idea.loc.coordinates);
        }
      }

      newMarkers.push(newMarker);
    });

    onSaveMarkers(newMarkers);
    this.setState({ hoverMarker });
  }

  clearMarkers() {
    this.props.markers.forEach((marker) => marker.remove());
  }

  createHoverMarker(lngLat, isFocused = false) {
    let newMarker = document.createElement('div');
    newMarker.className = 'hover-marker';
    newMarker.style.backgroundImage = isFocused ?
      'url("../assets/marker-icon-focus.png")' :
      'url("../assets/marker-icon.png")';
    newMarker.style.width = mapMarkers.icon.width;
    newMarker.style.height = mapMarkers.icon.height;

    return new mapboxgl.Marker(
      newMarker,
      { offset: [-mapMarkers.icon.width/2, -mapMarkers.icon.height] }
    )
      .setLngLat(lngLat)
      .addTo(this.map);
  }

  fitMapToMarkers(gradualFit = false, ideas = this.props.ideas) {
    const { destination } = this.props;
    const { southwest, northeast } = destination.viewport;
    const bounds = new mapboxgl.LngLatBounds(
      southwest.coordinates,
      northeast.coordinates
    );

    // Ensure the bounds captures all the ideas' locations
    ideas.map((idea) => bounds.extend(idea.loc.coordinates));
    this.map.fitBounds(bounds, {
      linear: !gradualFit,
      padding: 100,
      curve: 1,
      easing: easeInOutQuad
    });
  }

  focusMapOnIdea(focusedIdeaId, props) {
    const { ideas, markers, onClearFocusedIdea } = props;
    const index = ideas.findIndex((idea) => idea._id === focusedIdeaId);

    // Don't do anything if the idea isn't found
    if (index < 0) {
      onClearFocusedIdea();
      return;
    }

    const lngLat = markers[index].getLngLat();
    const focusedMarker = this.createHoverMarker(lngLat, true);
    this.flyToLocation(lngLat);
    this.setState({ focusedMarker });
  }

  flyToLocation(lngLat) {
    this.map.flyTo({
      center: lngLat,
      zoom: 15,
      curve: 1,
      easing: easeInOutQuad
    });
  }

  clearFocusMarker() {
    let { focusedMarker } = this.state;
    focusedMarker.remove();
    focusedMarker = null;
    this.setState({ focusedMarker });
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

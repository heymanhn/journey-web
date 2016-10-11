'use strict';

require('app/stylesheets/mapbox-gl.css');

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { Component, PropTypes } from 'react';
import { dimensions, mapbox, mapMarkers } from 'app/constants';

class TripMapDisplay extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.props.onUpdateMapWidth);
    this.map = this.loadMap();
    this.map.on('load', () => this.loadSourceData());
    this.fitMapToData(true);
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
      this.map
        .getSource(mapbox.ids.markers)
        .setData(createGeoJSON(newIdeas));
    }

    if (newHoverLngLat !== hoverLngLat) {
      this.loadHoverMarker(newProps);
    }

    if (newFocusLngLat !== focusLngLat) {
      this.loadFocusMarker(newProps);
    }

    if (fitMapRequest) {
      this.fitMapToData();
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

    let map = new mapboxgl.Map({
      container: this.container,
      style: mapbox.streetsStyle,
      attributionControl: true,
      center: this.props.destination.loc.coordinates,
    });

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.Navigation());
    return map;
  }

  loadSourceData() {
    const { ideas, trackIdeaView } = this.props;
    const { map } = this;
    const { hover, markers } = mapbox.ids;
    const flyToLocation = this.flyToLocation.bind(this);

    // Load the marker data into the map
    map.addSource(markers, {
      type: 'geojson',
      data: createGeoJSON(ideas)
    });

    // Add layers visualizing the markers and invisible hover targets
    map.addLayer(createLayerJSON(markers));
    map.addLayer(createLayerJSON(hover));

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    // Create event handlers for displaying popups
    map.on('mousemove', e => showOrHidePopup(popup, e.point, map));
    map.on('click', e => {
      const feature = showOrHidePopup(popup, e.point, map);
      if (feature) {
        trackIdeaView(feature.properties._id);
        flyToLocation(feature.geometry.coordinates);
      }
    });
  }

  fitMapToData(boundToDestination) {
    const { destination, ideas } = this.props;
    const {
      southwest: { coordinates: swll },
      northeast: { coordinates: nell }
    } = destination.viewport;

    let bounds;
    if (boundToDestination) {
      bounds = new mapboxgl.LngLatBounds(swll, nell);
    } else {
      bounds = new mapboxgl.LngLatBounds();
    }

    if (ideas.length === 1 && !boundToDestination) {
      this.map.easeTo({
        center: ideas[0].loc.coordinates,
        zoom: 15
      });
    } else {
      // Ensure the bounds captures all the ideas' locations
      ideas.map(idea => bounds.extend(idea.loc.coordinates));
      this.map.fitBounds(bounds, {
        linear: boundToDestination,
        padding: 100,
        duration: 1000,
        curve: 1,
        speed: 2,
        easing: easeInOutQuad
      });
    }
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
      curve: 0.5,
      easing: easeInOutQuad,
      speed: 2,
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
}

function createGeoJSON(ideas) {
  return {
    type: 'FeatureCollection',
    features: ideas.map(idea => createSourceEntry(idea))
  };
}

function createLayerJSON(name) {
  const { hover, markers } = mapbox.ids;
  let blur = name === markers ? 0.4 : 0;
  let color = name === markers ? "rgba(233, 30, 99, 1)" : "rgba(0, 0, 0, 0)";
  let radius = name === markers ? 8 : 15;

  return {
    id: name,
    type: 'circle',
    source: markers,
    paint: {
      "circle-radius": radius,
      "circle-color": color,
      "circle-blur": blur
    }
  };
}

function createSourceEntry(idea) {
  const { _id, name, photo, address, comment, loc } = idea;
  const properties = { _id, name, photo, address, comment };
  const geometry = loc;

  return {
    type: "Feature",
    properties,
    geometry
  };
}

function createPopupHTML(idea) {
  let popupHTML = idea.photo ? `<img src="${idea.photo}">` : '';
  popupHTML += `
    <p class="popup-name">${idea.name}</p>
    <p class="popup-address">${idea.address}</p>`;
  popupHTML += idea.comment ?
    `<p class="popup-comment">${idea.comment}</p>` : '';

  return popupHTML;
}

function showOrHidePopup(popup, point, map) {
  const { hover } = mapbox.ids;
  const features = map.queryRenderedFeatures(point, { layers: [hover] });

  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

  if (!features.length) {
    popup.remove();
    return;
  }

  // Add popup to map if the user hovers over a marker
  const feature = features[0];
  popup
    .setLngLat(feature.geometry.coordinates)
    .setHTML(createPopupHTML(feature.properties))
    .addTo(map);

  return feature;
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
  onClearFocusLngLat: PropTypes.func.isRequired,
  onDeleteFocusMarker: PropTypes.func.isRequired,
  onDeleteHoverMarker: PropTypes.func.isRequired,
  onSaveFocusMarker: PropTypes.func.isRequired,
  onSaveHoverMarker: PropTypes.func.isRequired,
  onUpdateMapWidth: PropTypes.func.isRequired,
  trackIdeaView: PropTypes.func.isRequired
};

export default TripMapDisplay;

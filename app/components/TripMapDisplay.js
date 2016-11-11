'use strict';

require('app/stylesheets/mapbox-gl.css');

import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { Component, PropTypes } from 'react';
import { dimensions, mapbox, mapMarkers } from 'app/constants';

class TripMapDisplay extends Component {
  componentDidMount() {
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
      this.fitMapToData(fitMapRequest === 'destination');
      onMapFitComplete();
    }
  }

  render() {
    const { destination, ideas } = this.props;

    const viewControl = (
      <div style={styles.viewControl}>
        <div style={styles.mapOption}>
          <img
            src="../assets/map-view.png"
            style={styles.mapIcon}
          />
          <span>Map</span>
        </div>
        <div style={styles.satelliteOption}>
          <div style={styles.earthEmoji}>🌎</div>
          <span>Satellite</span>
        </div>
      </div>
    );

    return (
      <div>
        <div
          ref={x => this.container = x}
          style={styles.mapContainer}
        >
          {viewControl}
        </div>
      </div>
    );
  }

  loadMap() {
    // Initialize the map and set it to the viewport of the destination
    mapboxgl.accessToken = mapbox.token;

    let map = new mapboxgl.Map({
      container: this.container,
      style: mapbox.styleURL + mapbox.streetsStyleId,
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
    const moveMapToLocation = this.moveMapToLocation.bind(this);

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
        moveMapToLocation(feature.geometry.coordinates);
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
        offset: [dimensions.leftColumn.width / 2, 0],
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
      this.moveMapToLocation(focusLngLat);
    }
  }

  moveMapToLocation(lngLat) {
    const opts = {
      center: lngLat,
      offset: [dimensions.leftColumn.width / 2, 0],
      zoom: 15
    };

    if (this.map.getZoom() >= 15) {
      opts.duration = 300;
      this.map.easeTo(opts);
    } else {
      opts.speed = 2;
      opts.easing = easeInOutQuad;
      this.map.flyTo(opts);
    }
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
  const { _id, name, photo, address, loc } = idea;
  const properties = { _id, name, photo, address };
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
  fitMapRequest: PropTypes.string,
  focusLngLat: PropTypes.array,
  focusMarker: PropTypes.object,
  hoverLngLat: PropTypes.array,
  hoverMarker: PropTypes.object,
  ideas: PropTypes.array,
  onClearFocusLngLat: PropTypes.func.isRequired,
  onDeleteFocusMarker: PropTypes.func.isRequired,
  onDeleteHoverMarker: PropTypes.func.isRequired,
  onSaveFocusMarker: PropTypes.func.isRequired,
  onSaveHoverMarker: PropTypes.func.isRequired,
  trackIdeaView: PropTypes.func.isRequired
};

const styles = {
  earthEmoji: {
    fontSize: 20,
    marginTop: 5,
    position: "relative",
    top: 2
  },
  mapContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "100%",
    zIndex: 1
  },
  viewControl: {
    backgroundColor: "white",
    borderRadius: 4,
    boxShadow: "0px 0px 0px 2px rgba(0,0,0,0.1)",
    float: "right",
    height: 90,
    position: "relative",
    right: 50,
    top: 10,
    width: 60,
    zIndex: 1
  },
  mapIcon: {
    marginTop: 3,
    position: "relative",
    top: 2
  },
  mapOption: {
    alignItems: "center",
    borderBottom: "1px solid #dddddd",
    display: "flex",
    flexDirection: "column",
    fontSize: 11,
    height: 45
  },
  satelliteOption: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    fontSize: 11,
    height: 45
  }
};

export default TripMapDisplay;

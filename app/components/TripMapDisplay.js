'use strict';

require('app/stylesheets/mapbox-gl.css');

import _ from 'underscore';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import React, { Component, PropTypes } from 'react';
import {
  categoryIcons,
  categoryMapIcons,
  colors,
  dimensions,
  IDEA_CATEGORY_PLACE,
  mapbox,
  mapMarkers
} from 'app/constants';

class TripMapDisplay extends Component {
  componentDidMount() {
    this.map = this.loadMap();
    this.map.on('load', () => this.loadSourceData());
    this.fitMapToData(true);
  }

  // Update the map markers if there are any changes
  componentWillReceiveProps(newProps) {
    const { focusLngLat, ideas, hoverLngLat } = this.props;
    const { map } = this;
    const {
      fitMapRequest,
      focusLngLat: newFocusLngLat,
      focusMarker,
      ideas: newIdeas,
      ideaToUpdate,
      hoverLngLat: newHoverLngLat,
      mapStyleURL,
      onDeleteFocusMarker,
      onIdeaUpdated,
      onMapFitComplete,
      onViewUpdated,
      viewChanged
    } = newProps;

    if (viewChanged) {
      map.setStyle(mapStyleURL);
      map.on('style.load', () => {
        !map.getSource(mapbox.ids.markers) && this.loadSourceData();
      });

      onViewUpdated();
    }

    if (newIdeas.length !== ideas.length || ideaToUpdate) {
      const ideasJSON = createGeoJSON(newIdeas);
      map
        .getSource(mapbox.ids.markers)
        .setData(ideasJSON);

      map
        .getSource(mapbox.ids.markers + 'data')
        .setData(ideasJSON);

      ideaToUpdate && onIdeaUpdated();
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
    const { destination, ideas, onSetMapView, onSetSatelliteView } = this.props;
    const { mapOption, satelliteOption } = styles;

    const viewControl = (
      <div style={styles.viewControl}>
        <div
          onClick={onSetMapView}
          style={this.loadOptionStyle(mapOption, 'map')}
        >
          <img
            src="../assets/map-view.png"
            style={styles.mapIcon}
          />
          <span>Map</span>
        </div>
        <div
          onClick={onSetSatelliteView}
          style={this.loadOptionStyle(satelliteOption, 'satellite')}
        >
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
    const { mapStyleURL } = this.props;

    // Initialize the map and set it to the viewport of the destination
    mapboxgl.accessToken = mapbox.token;

    let map = new mapboxgl.Map({
      container: this.container,
      style: mapStyleURL,
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
    const { ids: { hover, markers } } = mapbox;
    const moveMapToLocation = this.moveMapToLocation.bind(this);
    const ideasJSON = createGeoJSON(ideas);

    // Load the marker data into the map
    map.addSource(markers, {
      type: 'geojson',
      data: ideasJSON,
      cluster: true,
      clusterRadius: 30,
      clusterMaxZoom: 13
    });

    // Add layer for all markers for data query purposes
    map.addSource(markers + 'data', {
      type: 'geojson',
      data: ideasJSON
    });
    map.addLayer(createInvisiblePointsJSON());

    // Add layer for the place category markers
    map.addLayer(createPlaceLayerJSON());

    // Add layers visualizing the category icons
    map.addLayer(createIconBorderLayerJSON());
    map.addLayer(createIconFillLayerJSON());

    for (const category in categoryMapIcons) {
      map.addLayer(createIconLayerJSON(category));
    }

    // Add layer for the invisible tooltip hover targets
    map.addLayer(createHoverLayerJSON(IDEA_CATEGORY_PLACE));
    map.addLayer(createHoverLayerJSON());

    // Add layers for the clusters
    map.addLayer(createClusterCirclesJSON());
    map.addLayer(createClusterCountsJSON());

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 3
    });

    // Create event handlers for displaying popups
    map.on('mousemove', e => this.showOrHidePopup(popup, e.point, map));
    map.on('click', e => {
      const feature = this.showOrHidePopup(popup, e.point, map);
      if (feature) {
        trackIdeaView(feature.properties._id);
        moveMapToLocation(feature.geometry.coordinates);
      }
    });

    map.on('data', () => this.saveVisibleIdeas());
    map.on('moveend', () => this.saveVisibleIdeas());
  }

  saveVisibleIdeas() {
    const { onSaveVisibleIdeas } = this.props;
    const { hover } = mapbox.ids;
    const { margin, width } = dimensions.leftColumn;
    const northwest = [width + margin, 0];
    const southeast = [window.innerWidth, window.innerHeight];
    const features = this.map.queryRenderedFeatures(
      [northwest, southeast],
      { layers: ['invisiblePoints'] }
    );

    const ideas = _.uniq(features.map(f => f.properties._id).sort(), true);
    onSaveVisibleIdeas(ideas);
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
      { offset: [-mapMarkers.icon.width/2, -mapMarkers.icon.height - 3] }
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

  showOrHidePopup(popup, point, map, reCheck) {
    const {
      onClearPopupTimestamp,
      onSetPopupTimestamp,
      popupIdeaId,
      popupTimestamp
    } = this.props;
    const { hover } = mapbox.ids;
    const features = map.queryRenderedFeatures(
      point,
      { layers: [IDEA_CATEGORY_PLACE + hover, 'Icon' + hover] }
    );

    if (!features.length) {
      popup.remove();
      popupTimestamp && onClearPopupTimestamp();
      return;
    }

    const feature = features[0];
    const ideaId = feature.properties._id;
    const delay = mapMarkers.popupDelay;

    // The user must hover over an idea for a while before showing the tooltip
    if (!popupTimestamp && !reCheck) {
      onSetPopupTimestamp(ideaId);
      setTimeout(() => this.showOrHidePopup(popup, point, map, true), delay);
      return;
    }

    if (Date.now() < popupTimestamp + delay || popupIdeaId !== ideaId) {
      return;
    }

    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = features.length ? 'pointer' : '';

    // Add popup to map if the user hovers over a marker
    popup
      .setLngLat(feature.geometry.coordinates)
      .setHTML(createPopupHTML(feature.properties))
      .addTo(map);

    return feature;
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

  loadOptionStyle(style, option) {
    const { mapStyle } = this.props;

    if (mapStyle === option) {
      return { ...style, backgroundColor: "#eeeeee" };
    }

    return style;
  }
}

function createGeoJSON(ideas) {
  return {
    type: 'FeatureCollection',
    features: ideas.map(idea => createSourceEntry(idea))
  };
}

function createCircleLayerJSON(opts) {
  const { blur, color, filter, id, radius, source } = opts;
  let layerJSON = {
    id,
    type: 'circle',
    source: source || mapbox.ids.markers,
    paint: {
      'circle-radius': radius,
      'circle-color': color,
      'circle-blur': blur || 0
    }
  };

  return filter ? { ...layerJSON, filter } : layerJSON;
}

function createInvisiblePointsJSON() {
  return createCircleLayerJSON({
    id: 'invisiblePoints',
    radius: 1,
    source: mapbox.ids.markers + 'data',
    color: 'rgba(0,0,0,0)'
  });
}

function createPlaceLayerJSON() {
  return createCircleLayerJSON({
    id: IDEA_CATEGORY_PLACE + 'Markers',
    filter: ['all',
      ['!has', 'point_count'],
      ['==', 'category', IDEA_CATEGORY_PLACE]],
    radius: mapMarkers.places.radius,
    blur: 0.2,
    color: colors.primary
  });
}

function createIconBorderLayerJSON() {
  return createCircleLayerJSON({
    id: 'IconMarkersBorders',
    filter: ['all',
      ['!has', 'point_count'],
      ['!=', 'category', IDEA_CATEGORY_PLACE]],
    radius: mapMarkers.categories.radius,
    color: colors.primary,
    blur: 0.1
  });
}

function createIconFillLayerJSON() {
  return createCircleLayerJSON({
    id: 'IconMarkersFill',
    filter: ['all',
      ['!has', 'point_count'],
      ['!=', 'category', IDEA_CATEGORY_PLACE]],
    radius: mapMarkers.categories.radius - 2,
    color: 'rgba(249, 249, 249, 1)',
    blur: 0.1
  });
}

function createIconLayerJSON(category) {
  const categoryDetails = categoryMapIcons[category];
  return {
    id: 'IconMarkers' + category,
    type: 'symbol',
    source: mapbox.ids.markers,
    filter: ['all',
      ['!has', 'point_count'],
      ['==', 'category', category]],
    layout: {
      'icon-image': categoryDetails.name,
      'icon-size': categoryDetails.size,
      'icon-allow-overlap': true
    }
  };
}

function createHoverLayerJSON(place) {
  return createCircleLayerJSON({
    id: (place || 'Icon') + mapbox.ids.hover,
    filter: ["!has", "point_count"],
    radius: place ? 15 : 18,
    color: 'rgba(0, 0, 0, 0)'
  });
}

function createClusterCirclesJSON() {
  return createCircleLayerJSON({
    id: 'cluster-circles',
    filter: ['>=', 'point_count', 0],
    radius: 25,
    color: colors.primary,
    blur: 0.1
  });
}

function createClusterCountsJSON() {
  return {
    id: 'cluster-counts',
    type: 'symbol',
    source: mapbox.ids.markers,
    layout: {
      'text-field': '{point_count}',
      'text-font': ['Open Sans Bold'],
      'text-size': 18
    },
    paint: {
      'text-color': 'white'
    }
  };
}

function createSourceEntry(idea) {
  const { _id, name, category, photo, address, loc } = idea;
  const properties = { _id, name, category, photo, address };
  const geometry = loc;

  return {
    type: "Feature",
    properties,
    geometry
  };
}

function createPopupHTML(idea) {
  const { category, name, photo, address } = idea;
  const categoryHTML = categoryIcons[category] || `<img
    class="popup-idea-default-icon"
    src="../assets/place-idea-icon.png"
  />`;

  let popupHTML = '<div class="popup-idea">';
  popupHTML += `<div class="popup-idea-category">${categoryHTML}</div><div>`;
  popupHTML += photo ? `<img class="popup-idea-photo" src="${photo}">` : '';
  popupHTML += `
    <p class="popup-idea-name">${name}</p>
    <p class="popup-idea-address">${address}</p>
  </div></div>`;

  return popupHTML;
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
  ideaToUpdate: PropTypes.string,
  mapStyle: PropTypes.string.isRequired,
  mapStyleURL: PropTypes.string.isRequired,
  onClearFocusLngLat: PropTypes.func.isRequired,
  onClearPopupTimestamp: PropTypes.func.isRequired,
  onDeleteFocusMarker: PropTypes.func.isRequired,
  onDeleteHoverMarker: PropTypes.func.isRequired,
  onIdeaUpdated: PropTypes.func.isRequired,
  onSaveFocusMarker: PropTypes.func.isRequired,
  onSaveHoverMarker: PropTypes.func.isRequired,
  onSaveVisibleIdeas: PropTypes.func.isRequired,
  onSetMapView: PropTypes.func.isRequired,
  onSetPopupTimestamp: PropTypes.func.isRequired,
  onSetSatelliteView: PropTypes.func.isRequired,
  onViewUpdated: PropTypes.func.isRequired,
  popupIdeaId: PropTypes.string,
  popupTimestamp: PropTypes.number,
  trackIdeaView: PropTypes.func.isRequired,
  viewChanged: PropTypes.bool.isRequired
};

const styles = {
  earthEmoji: {
    fontSize: 20,
    fontWeight: "normal",
    marginTop: 5,
    position: "relative",
    top: 2
  },
  mapContainer: {
    position: "fixed",
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
    top: 1
  },
  mapOption: {
    alignItems: "center",
    borderBottom: "1px solid #dddddd",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    fontSize: 11,
    fontWeight: 500,
    height: 45
  },
  satelliteOption: {
    alignItems: "center",
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    fontSize: 11,
    fontWeight: 500,
    height: 45
  }
};

export default TripMapDisplay;

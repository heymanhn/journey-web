'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import {
  changeToMapView,
  changeToSatelliteView,
  deleteFocusMarker,
  deleteHoverMarker,
  saveFocusMarker,
  saveHoverMarker,
  saveIconMarkers,
  showAllTripIdeasComplete,
  viewUpdated
} from 'app/actions/map';
import { clearFocusLngLat } from 'app/actions/trips';
import TripMapDisplay from 'app/components/TripMapDisplay';
import { analytics, calcMapWidth, mapbox } from 'app/constants';

const mapStateToProps = (state) => {
  const {
    trip: { destination, ideas },
    focusLngLat,
    hoverLngLat
  } = state.tripState;
  const {
    fitMapRequest,
    focusMarker,
    hoverMarker,
    iconMarkers,
    mapStyle,
    viewChanged
  } = state.componentsState.mapState;
  const { satelliteStyleId, streetsStyleId, styleURL } = mapbox;

  let mapStyleURL;
  switch(mapStyle) {
    case 'satellite':
      mapStyleURL = styleURL + satelliteStyleId;
      break;
    case 'map':
    default:
      mapStyleURL = styleURL + streetsStyleId;
      break;
  }

  return {
    destination,
    fitMapRequest,
    focusLngLat,
    focusMarker,
    hoverLngLat,
    hoverMarker,
    iconMarkers,
    ideas,
    mapStyle,
    mapStyleURL,
    viewChanged
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearFocusLngLat() {
      dispatch(clearFocusLngLat());
    },

    onDeleteHoverMarker(marker) {
      marker && marker.remove();
      dispatch(deleteHoverMarker());
    },

    onDeleteFocusMarker(marker) {
      marker && marker.remove();
      dispatch(deleteFocusMarker());
    },

    onSaveFocusMarker(marker) {
      dispatch(saveFocusMarker(marker));
    },

    onSaveHoverMarker(marker) {
      dispatch(saveHoverMarker(marker));
    },

    onSaveIconMarkers(markers) {
      dispatch(saveIconMarkers(markers));
    },

    onMapFitComplete() {
      dispatch(showAllTripIdeasComplete());
    },

    onSetMapView() {
      dispatch(changeToMapView());
    },

    onSetSatelliteView() {
      dispatch(changeToSatelliteView());
    },

    onViewUpdated() {
      dispatch(viewUpdated());
    },

    trackIdeaView(ideaId) {
      dispatch(apiTripPageEvent(analytics.pages.TRIP_IDEA, { ideaId } ));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripMapDisplay);

'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import {
  changeToMapView,
  changeToSatelliteView,
  clearPopupTimestamp,
  deleteFocusMarker,
  deleteHoverMarker,
  ideaUpdated,
  saveFocusMarker,
  saveHoverMarker,
  setPopupTimestamp,
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
    hoverLngLat,
  } = state.tripState;
  const {
    fitMapRequest,
    focusMarker,
    hoverMarker,
    ideaToUpdate,
    mapStyle,
    popupTimestamp,
    popupIdeaId,
    viewChanged
  } = state.componentsState.mapState;
  const { satelliteStreetsStyleId, streetsStyleId, styleURL } = mapbox;

  let mapStyleURL;
  switch(mapStyle) {
    case 'satellite':
      mapStyleURL = styleURL + satelliteStreetsStyleId;
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
    ideas,
    ideaToUpdate,
    mapStyle,
    mapStyleURL,
    popupIdeaId,
    popupTimestamp,
    viewChanged
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearFocusLngLat() {
      dispatch(clearFocusLngLat());
    },

    onClearPopupTimestamp() {
      dispatch(clearPopupTimestamp());
    },

    onDeleteHoverMarker(marker) {
      marker && marker.remove();
      dispatch(deleteHoverMarker());
    },

    onDeleteFocusMarker(marker) {
      marker && marker.remove();
      dispatch(deleteFocusMarker());
    },

    onIdeaUpdated() {
      dispatch(ideaUpdated());
    },

    onSaveFocusMarker(marker) {
      dispatch(saveFocusMarker(marker));
    },

    onSaveHoverMarker(marker) {
      dispatch(saveHoverMarker(marker));
    },

    onMapFitComplete() {
      dispatch(showAllTripIdeasComplete());
    },

    onSetMapView() {
      dispatch(changeToMapView());
    },

    onSetPopupTimestamp(ideaId) {
      dispatch(setPopupTimestamp(ideaId));
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

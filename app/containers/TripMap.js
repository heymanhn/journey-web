'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import {
  deleteFocusMarker,
  deleteHoverMarker,
  saveFocusMarker,
  saveHoverMarker,
  saveMarkers,
  showAllTripIdeasComplete,
  updateMapWidth
} from 'app/actions/map';
import { clearFocusLngLat } from 'app/actions/trips';
import TripMapDisplay from 'app/components/TripMapDisplay';
import { analytics } from 'app/constants';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  const ms = state.mapState;
  return {
    destination: ts.trip.destination,
    fitMapRequest: ms.fitMapRequest,
    focusLngLat: ts.focusLngLat,
    focusMarker: ms.focusMarker,
    hoverLngLat: ts.hoverLngLat,
    hoverMarker: ms.hoverMarker,
    ideas: ts.trip.ideas,
    mapWidth: ms.mapWidth,
    markers: ms.markers
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

    onSaveHoverMarker(marker) {
      dispatch(saveHoverMarker(marker));
    },

    onSaveFocusMarker(marker) {
      dispatch(saveFocusMarker(marker));
    },

    onSaveMarkers(markers) {
      dispatch(saveMarkers(markers));
    },

    onMapFitComplete() {
      dispatch(showAllTripIdeasComplete());
    },

    onUpdateMapWidth(width) {
      dispatch(updateMapWidth(width));
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

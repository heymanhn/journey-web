'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import {
  deleteFocusMarker,
  deleteHoverMarker,
  saveFocusMarker,
  saveHoverMarker,
  saveMarkers
} from 'app/actions/map';
import { clearFocusedIdea } from 'app/actions/trips';
import TripMapDisplay from 'app/components/TripMapDisplay';
import { analytics } from 'app/constants';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  const ms = state.mapState;
  return {
    destination: ts.trip.destination,
    focusMarker: ms.focusMarker,
    focusedIdea: ts.focusedIdea || '',
    hoverMarker: ms.hoverMarker,
    ideas: ts.trip.ideas,
    markers: ms.markers,
    mouseOverIdea: ts.mouseOverIdea || ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearFocusedIdea() {
      dispatch(clearFocusedIdea());
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

    trackIdeaView(ideaId) {
      dispatch(apiTripPageEvent(analytics.pages.TRIP_IDEA, { ideaId } ));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripMapDisplay);

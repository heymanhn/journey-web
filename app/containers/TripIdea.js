'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import {
  apiRemoveTripIdea,
  apiUpdateTripIdea,
  clearHoverLngLat,
  reorderTripIdea,
  setFocusLngLat,
  setHoverLngLat
} from 'app/actions/trips';
import TripIdeaUI from 'app/components/TripIdeaUI';
import { analytics } from 'app/constants';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    hoverLngLat: ts.hoverLngLat
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { _id: ideaId, loc: { coordinates } } = props.idea;

  return {
    onClearHoverLngLat() {
      dispatch(clearHoverLngLat());
    },

    onFocusIdea() {
      dispatch(apiTripPageEvent(analytics.pages.TRIP_IDEA, { ideaId } ));
      dispatch(setFocusLngLat(coordinates));
    },

    onRemoveIdea() {
      dispatch(apiRemoveTripIdea(ideaId));
    },

    onReorderIdea: (index1, index2) => {
      dispatch(reorderTripIdea(index1, index2));
    },

    onSetHoverLngLat() {
      dispatch(setHoverLngLat(coordinates));
    },

    onUpdateIdea() {
      dispatch(apiUpdateTripIdea(props.index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIdeaUI);

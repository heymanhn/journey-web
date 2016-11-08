'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import {
  apiRemoveTripIdea,
  apiUpdateTripIdea,
  clearHoverLngLat,
  reorderTripIdea,
  setFocusLngLat,
  setHoverLngLat,
  setIdeaIndexToUpdate
} from 'app/actions/trips';
import { showModal } from 'app/actions/modals';
import TripIdeaUI from 'app/components/TripIdeaUI';
import { analytics, modalComponents } from 'app/constants';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    hoverLngLat: ts.hoverLngLat
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { idea: { _id: ideaId, loc: { coordinates } }, index } = ownProps;

  return {
    onClearHoverLngLat() {
      dispatch(clearHoverLngLat());
    },

    onEditIdea() {

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

    onShowTripIdeaSettingsModal(event) {
      event.stopPropagation();
      dispatch(setIdeaIndexToUpdate(index));
      dispatch(showModal(modalComponents.tripIdeaSettings));
    },

    onUpdateIdea() {
      dispatch(apiUpdateTripIdea(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIdeaUI);

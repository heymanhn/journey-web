'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import { showModal } from 'app/actions/modals';
import {
  apiUpdateTripIdea,
  clearEditingIdea,
  clearHoverLngLat,
  reorderTripIdea,
  saveIdeaUpdatedComment,
  setEditingIdea,
  setFocusLngLat,
  setHoverLngLat,
  setIdeaIndexToUpdate,
  setTripIdeaToDelete
} from 'app/actions/trips';
import TripIdeaUI from 'app/components/TripIdeaUI';
import { analytics, modalComponents } from 'app/constants';

const mapStateToProps = (state, ownProps) => {
  const { editingIdea, hoverLngLat } = state.tripState;
  return {
    hoverLngLat,
    isEditing: editingIdea === ownProps.idea._id
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { idea: { _id: ideaId, loc: { coordinates } }, index } = ownProps;
  const { deleteTripIdea } = modalComponents;

  return {
    onClearHoverLngLat() {
      dispatch(clearHoverLngLat());
    },

    onEditIdea() {
      dispatch(setEditingIdea(ideaId));
    },

    onEnterComment(event) {
      dispatch(saveIdeaUpdatedComment(event.target.value));
    },

    onExitEditMode() {
      dispatch(clearEditingIdea());
    },

    onFocusIdea() {
      dispatch(apiTripPageEvent(analytics.pages.TRIP_IDEA, { ideaId } ));
      dispatch(setFocusLngLat(coordinates));
    },

    onReorderIdea: (index1, index2) => {
      dispatch(reorderTripIdea(index1, index2));
    },

    onSetHoverLngLat() {
      dispatch(setHoverLngLat(coordinates));
    },

    onShowDeleteTripIdeaModal() {
      dispatch(showModal(deleteTripIdea));
      dispatch(setTripIdeaToDelete(ideaId));
    },

    onUpdateIdea() {
      dispatch(apiUpdateTripIdea(index)).then(() => {
        return dispatch(clearEditingIdea());
      });
    },

    onUpdateIdeaAfterDrag() {
      dispatch(apiUpdateTripIdea(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIdeaUI);

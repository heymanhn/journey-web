'use strict';

import { connect } from 'react-redux';
import { hideModal } from 'app/actions/modals';
import {
  apiUpdateTripIdea,
  clearIdeaUpdatedComment,
  saveIdeaUpdatedComment
} from 'app/actions/trips';
import TripIdeaSettingsModal from 'app/components/TripIdeaSettingsModal';
import { modalComponents } from 'app/constants';

const mapStateToProps = (state) => {
  const {
    ideaIndexToUpdate: index,
    isFetching,
    trip,
    newComment
  } = state.tripState;
  const { showModal } = state.componentsState.modalsState.tripIdeaSettings;
  let comment;
  if (typeof index !== 'undefined') {
    comment = trip.ideas[index].comment;
  }

  return {
    comment,
    isFetching,
    isSaveDisabled: isFetching || !newComment,
    showModal
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterComment(event) {
      const newComment = event.target.value;

      if (newComment) {
        dispatch(saveIdeaUpdatedComment(newComment));
      } else {
        dispatch(clearIdeaUpdatedComment());
      }
    },

    onHide() {
      dispatch(hideModal(modalComponents.tripIdeaSettings));
    },

    onUpdateTripIdea() {
      dispatch(apiUpdateTripIdea());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIdeaSettingsModal);

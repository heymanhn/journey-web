'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import {
  apiRemoveTripIdea,
  apiUpdateTripIdea,
  clearMouseOverIdea,
  reorderTripIdea,
  setFocusedIdea,
  setMouseOverIdea
} from 'app/actions/trips';
import TripIdeaUI from 'app/components/TripIdeaUI';
import { analytics } from 'app/constants';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    mouseOverIdea: ts.mouseOverIdea || ''
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { _id: ideaId } = props.idea;
  return {
    onClearMouseOverIdea() {
      dispatch(clearMouseOverIdea(ideaId));
    },

    onFocusIdea() {
      dispatch(apiTripPageEvent(analytics.pages.TRIP_IDEA, { ideaId } ));
      dispatch(setFocusedIdea(ideaId));
    },

    onRemoveIdea() {
      dispatch(apiRemoveTripIdea(ideaId));
    },

    onReorderIdea: (index1, index2) => {
      dispatch(reorderTripIdea(index1, index2));
    },

    onSetMouseOverIdea() {
      dispatch(setMouseOverIdea(ideaId));
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

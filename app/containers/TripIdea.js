'use strict';

import { connect } from 'react-redux';
import {
  apiRemoveTripIdea,
  apiUpdateTripIdea,
  clearMouseOverIdea,
  reorderTripIdea,
  setFocusedIdea,
  setMouseOverIdea
} from '../actions/trips';
import TripIdeaUI from '../components/TripIdeaUI';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    mouseOverIdea: ts.mouseOverIdea || ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearMouseOverIdea: (ideaId) => {
      dispatch(clearMouseOverIdea(ideaId));
    },
    onFocusIdea: (ideaId) => {
      dispatch(setFocusedIdea(ideaId));
    },
    onRemoveIdea: (ideaId) => {
      dispatch(apiRemoveTripIdea(ideaId));
    },
    onReorderIdea: (index1, index2) => {
      dispatch(reorderTripIdea(index1, index2));
    },
    onSetMouseOverIdea: (ideaId) => {
      dispatch(setMouseOverIdea(ideaId));
    },
    onUpdateIdea: (index) => {
      dispatch(apiUpdateTripIdea(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIdeaUI);

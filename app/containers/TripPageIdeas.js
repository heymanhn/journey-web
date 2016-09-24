'use strict';

import { connect } from 'react-redux';
import {
  apiAddTripIdea,
  apiRemoveTripIdea,
  reorderTripIdea,
  saveNewTripIdea,
  saveIdeaComment,
  tripIdeaCleared
} from '../actions/trips';
import TripPageIdeasList from '../components/TripPageIdeasList';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    destination: ts.trip.destination,
    error: ts.error ? ts.error : '',
    ideas: ts.trip.ideas,
    resetIdeaBox: ts.resetIdeaBox
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIdeaPress: (tripId) => {
      dispatch(apiAddTripIdea(tripId));
    },
    onEnterIdea: (idea) => {
      dispatch(saveNewTripIdea(idea));
    },
    onEnterIdeaComment: (event) => {
      dispatch(saveIdeaComment(event.target.value));
    },
    onIdeaCleared: () => {
      dispatch(tripIdeaCleared());
    },
    onRemoveIdea: (ideaId) => {
      dispatch(apiRemoveTripIdea(ideaId));
    },
    onReorderIdea: (index1, index2) => {
      dispatch(reorderTripIdea(index1, index2));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPageIdeasList);

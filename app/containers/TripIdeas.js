'use strict';

import { connect } from 'react-redux';
import {
  apiAddTripIdea,
  apiRemoveTripIdea,
  apiUpdateTripIdea,
  reorderTripIdea,
  saveNewTripIdea,
  saveIdeaComment,
  tripIdeaCleared
} from '../actions/trips';
import TripIdeasList from '../components/TripIdeasList';

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
    },
    onUpdateIdea: (index) => {
      dispatch(apiUpdateTripIdea(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIdeasList);

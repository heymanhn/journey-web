'use strict';

import { connect } from 'react-redux';
import {
  apiAddTripIdea,
  apiRemoveTripIdea,
  clearDragIndex,
  saveNewTripIdea,
  saveIdeaComment,
  setDragIndex,
  tripIdeaCleared
} from '../actions/trips';
import TripPageIdeasList from '../components/TripPageIdeasList';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    destination: ts.trip.destination,
    dragIndex: ts.dragIndex,
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
    onClearDragIndex: () => {
      dispatch(clearDragIndex());
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
    onSetDragIndex: (index) => {
      dispatch(setDragIndex(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPageIdeasList);

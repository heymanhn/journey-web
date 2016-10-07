'use strict';

import { connect } from 'react-redux';
import {
  apiAddTripIdea,
  saveIdeaComment,
  saveNewTripIdea,
  tripIdeaCleared
} from 'app/actions/trips';
import TripIdeasList from 'app/components/TripIdeasList';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    destination: ts.trip.destination,
    error: ts.error ? ts.error : '',
    ideas: ts.trip.ideas,
    newIdea: ts.newIdea,
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIdeasList);

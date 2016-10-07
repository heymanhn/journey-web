'use strict';

import { connect } from 'react-redux';
import {
  apiAddTripIdea,
  clearNewTripIdea,
  saveIdeaComment,
  saveNewTripIdea
} from 'app/actions/trips';
import TripIdeasList from 'app/components/TripIdeasList';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    destination: ts.trip.destination,
    error: ts.error ? ts.error : '',
    ideas: ts.trip.ideas,
    newIdea: ts.newIdea
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIdeaPress() {
      dispatch(apiAddTripIdea());
    },

    onClearTripIdea() {
      dispatch(clearNewTripIdea());
    },

    onEnterIdea(idea) {
      dispatch(saveNewTripIdea(idea));
    },

    onEnterIdeaComment(event) {
      dispatch(saveIdeaComment(event.target.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIdeasList);

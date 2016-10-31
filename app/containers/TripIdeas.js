'use strict';

import { connect } from 'react-redux';
import { showAllTripIdeasOnMap } from 'app/actions/map';
import {
  apiAddTripIdea,
  clearNewTripIdea,
  saveIdeaComment,
  saveNewTripIdea
} from 'app/actions/trips';
import TripIdeasList from 'app/components/TripIdeasList';

const mapStateToProps = (state) => {
  const { user } = state.authState;
  const { error, trip, newIdea } = state.tripState;
  const { creator, ideas, visibility } = trip;
  return {
    error,
    ideas,
    isViewOnly: visibility === 'viewOnly' && (!user || user._id !== creator),
    newIdea
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
    },

    onShowAllIdeas() {
      dispatch(showAllTripIdeasOnMap());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIdeasList);

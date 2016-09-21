'use strict';

import { connect } from 'react-redux';
import {
  apiAddTripIdea,
  apiGetTrip,
  saveNewTripIdea,
  saveIdeaComment,
  tripIdeaCleared
} from '../actions/trips';
import TripPage from '../components/TripPage';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    error: ts.error ? ts.error : '',
    resetIdeaBox: ts.resetIdeaBox,
    trip: ts.trip
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
    onGetTrip: (tripId) => {
      dispatch(apiGetTrip(tripId));
    },
    onIdeaCleared: () => {
      dispatch(tripIdeaCleared());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPage);

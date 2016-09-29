'use strict';

import { connect } from 'react-redux';
import { clearFocusedIdea } from '../actions/trips';
import TripMapDisplay from '../components/TripMapDisplay';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    destination: ts.trip.destination,
    focusedIdea: ts.focusedIdea || '',
    ideas: ts.trip.ideas,
    mouseOverIdea: ts.mouseOverIdea || ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClearFocusedIdea: () => {
      dispatch(clearFocusedIdea());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripMapDisplay);

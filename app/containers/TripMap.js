'use strict';

import { connect } from 'react-redux';
import TripMapDisplay from '../components/TripMapDisplay';

const mapStateToProps = (state) => {
  const ts = state.tripState;
  return {
    destination: ts.trip.destination,
    ideas: ts.trip.ideas,
    mouseOverIdea: ts.mouseOverIdea || ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripMapDisplay);

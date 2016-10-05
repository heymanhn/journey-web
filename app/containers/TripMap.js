'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import { clearFocusedIdea } from 'app/actions/trips';
import TripMapDisplay from 'app/components/TripMapDisplay';
import { analytics } from 'app/constants';

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
    onClearFocusedIdea() {
      dispatch(clearFocusedIdea());
    },

    trackIdeaView(ideaId) {
      dispatch(apiTripPageEvent(analytics.pages.TRIP_IDEA, { ideaId } ));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripMapDisplay);

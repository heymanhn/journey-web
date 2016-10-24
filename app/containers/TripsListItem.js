'use strict';

import { connect } from 'react-redux';
import {
  apiDeleteTrip,
  clearHoverOverTrip,
  hoverOverTrip
} from 'app/actions/trips';
import { viewTripPage } from 'app/actions/navigation';
import TripsListItemUI from 'app/components/TripsListItemUI';

const mapStateToProps = (state) => {
  const { hoverTripId } = state.tripsState;
  return {
    hoverTripId
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const tripId = ownProps.trip._id;
  return {
    onClearHoverOverTrip() {
      dispatch(clearHoverOverTrip());
    },

    onDeleteTripPress(event) {
      event.stopPropagation();
      dispatch(apiDeleteTrip(tripId));
    },

    onHoverOverTrip() {
      dispatch(hoverOverTrip(tripId));
    },

    onViewTrip() {
      dispatch(viewTripPage(tripId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsListItemUI);

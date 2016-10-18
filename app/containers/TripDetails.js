'use strict';

import { connect } from 'react-redux';
import { showDestinationOnMap } from 'app/actions/map';
import { apiUpdateTrip, showTripSettingsModal } from 'app/actions/trips';
import TripDetailsView from 'app/components/TripDetailsView';

const mapStateToProps = (state) => {
  const { isFetchingVisibility, trip } = state.tripState;
  return {
    isFetchingVisibility,
    trip
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onShowDestination() {
      dispatch(showDestinationOnMap());
    },

    onSetTripVisibility(visibility) {
      dispatch(apiUpdateTrip(visibility));
    },

    onShowTripSettingsModal() {
      dispatch(showTripSettingsModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripDetailsView);

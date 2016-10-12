'use strict';

import { connect } from 'react-redux';
import { showDestinationOnMap } from 'app/actions/map';
import { apiUpdateTrip } from 'app/actions/trips';
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
      dispatch(apiUpdateTrip({ visibility }, true));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripDetailsView);

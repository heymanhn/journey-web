'use strict';

import { connect } from 'react-redux';
import { showDestinationOnMap } from 'app/actions/map';
import { showModal } from 'app/actions/modals';
import { apiUpdateTrip } from 'app/actions/trips';
import TripDetailsView from 'app/components/TripDetailsView';
import { modalComponents } from 'app/constants';

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
      dispatch(showModal(modalComponents.tripSettings, 'update'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripDetailsView);

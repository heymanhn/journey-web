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

    onToggleTripVisibility(visibility) {
      switch(visibility) {
        case 'public':
          return dispatch(apiUpdateTrip('viewOnly'));
        case 'viewOnly':
          return dispatch(apiUpdateTrip('private'));
        case 'private':
          return dispatch(apiUpdateTrip('public'));
      }
    },

    onShowTripSettingsModal() {
      dispatch(showModal(modalComponents.tripSettings));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripDetailsView);

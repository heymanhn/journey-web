'use strict';

import { connect } from 'react-redux';
import {
  hideTripSettingsModal,
  updateTripSaveDest,
  updateTripSaveTitle
} from 'app/actions/trips';
import TripSettingsModal from 'app/components/TripSettingsModal';

const mapStateToProps = (state) => {
  const { showModal, trip } = state.tripState;
  return {
    showModal,
    trip
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterDestination(place) {
      dispatch(updateTripSaveDest(place));
    },

    onEnterTitle(event) {
      dispatch(updateTripSaveTitle(event.target.value));
    },

    onHide() {
      dispatch(hideTripSettingsModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripSettingsModal);

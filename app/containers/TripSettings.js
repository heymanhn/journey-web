'use strict';

import { connect } from 'react-redux';
import {
  apiUpdateTrip,
  updateTripClearTitle,
  updateTripSaveTitle,
  updateTripSaveVis
} from 'app/actions/trips';
import { hideModal } from 'app/actions/modals';
import TripSettingsModal from 'app/components/TripSettingsModal';
import { modalComponents } from 'app/constants';
const { tripSettings } = modalComponents;

const mapStateToProps = (state) => {
  const {
    isFetching,
    trip: { title, destination: { name: destinationName }, visibility },
    updatedFields
  } = state.tripState;
  const { showModal } = state.componentsState.modalsState.tripSettings;

  let newDestinationName, newVisibility;
  let isSaveDisabled = true;

  if (updatedFields && Object.keys(updatedFields).length > 0) {
    isSaveDisabled = false;
    if (updatedFields.destination) {
      newDestinationName = updatedFields.destination.name;
    }
    newVisibility = updatedFields.visibility;
  }

  return {
    isFetching,
    isSaveDisabled: isFetching || isSaveDisabled,
    showModal,
    title,
    destinationName: newDestinationName || destinationName,
    visibility: newVisibility || visibility
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterTitle(event) {
      const newTitle = event.target.value;

      if (newTitle) {
        dispatch(updateTripSaveTitle(event.target.value));
      } else {
        dispatch(updateTripClearTitle());
      }
    },

    onHide() {
      dispatch(hideModal(tripSettings));
    },

    onSetPrivate() {
      dispatch(updateTripSaveVis('private'));
    },

    onSetPublic() {
      dispatch(updateTripSaveVis('public'));
    },

    onUpdateTrip() {
      dispatch(apiUpdateTrip());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripSettingsModal);

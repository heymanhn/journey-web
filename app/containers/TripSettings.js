'use strict';

import { connect } from 'react-redux';
import {
  apiUpdateTrip,
  hideTripSettingsModal,
  updateTripSaveTitle,
  updateTripSaveVis
} from 'app/actions/trips';
import TripSettingsModal from 'app/components/TripSettingsModal';

const mapStateToProps = (state) => {
  const {
    isFetching,
    showModal,
    trip: { title, destination: { name: destinationName }, visibility },
    updatedFields
  } = state.tripState;
  let newTitle, newDestinationName, newVisibility;
  let isSaveDisabled = true;

  if (updatedFields && Object.keys(updatedFields).length > 0) {
    isSaveDisabled = false;
    newTitle = updatedFields.title;
    if (updatedFields.destination) {
      newDestinationName = updatedFields.destination.name;
    }
    newVisibility = updatedFields.visibility;
  }

  return {
    isSaveDisabled: isFetching || isSaveDisabled,
    showModal,
    title: newTitle || title,
    destinationName: newDestinationName || destinationName,
    visibility: newVisibility || visibility
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEnterTitle(event) {
      dispatch(updateTripSaveTitle(event.target.value));
    },

    onHide() {
      dispatch(hideTripSettingsModal());
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

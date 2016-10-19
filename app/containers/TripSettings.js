'use strict';

import { connect } from 'react-redux';
import {
  apiUpdateTrip,
  clearNewTripTitle,
  saveNewTripTitle,
  saveNewTripVisibility
} from 'app/actions/trips';
import { hideModal } from 'app/actions/modals';
import TripSettingsModal from 'app/components/TripSettingsModal';
import { modalComponents } from 'app/constants';
const { tripSettings } = modalComponents;

const mapStateToProps = (state) => {
  const {
    isFetching,
    trip: { title, destination: { name: destinationName }, visibility },
    newFields
  } = state.tripState;
  const { showModal } = state.componentsState.modalsState.tripSettings;

  let newDestinationName, newVisibility;
  let isSaveDisabled = true;

  if (newFields && Object.keys(newFields).length > 0) {
    isSaveDisabled = false;
    if (newFields.destination) {
      newDestinationName = newFields.destination.name;
    }
    newVisibility = newFields.visibility;
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
        dispatch(saveNewTripTitle(newTitle));
      } else {
        dispatch(clearNewTripTitle());
      }
    },

    onHide() {
      dispatch(hideModal(tripSettings));
    },

    onSetPrivate() {
      dispatch(saveNewTripVisibility('private'));
    },

    onSetPublic() {
      dispatch(saveNewTripVisibility('public'));
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

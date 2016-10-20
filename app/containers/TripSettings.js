'use strict';

import { connect } from 'react-redux';
import {
  apiCreateTrip,
  apiUpdateTrip,
  clearNewTripTitle,
  saveNewTripTitle,
  saveNewTripVisibility
} from 'app/actions/trips';
import { hideModal } from 'app/actions/modals';
import TripSettingsModal from 'app/components/TripSettingsModal';
import { modalComponents } from 'app/constants';
const { tripSettings } = modalComponents;

const mapStateToProps = (state, ownProps) => {
  const { showModal } = state.componentsState.modalsState.tripSettings;
  const { action } = ownProps;
  const {
    error,
    isFetching,
    trip,
    newFields
  } = state.tripState;
  let title, destinationName, visibility, newVisibility;
  let isSaveDisabled = true;

  if (action === 'update' && trip) {
    title = trip.title;
    destinationName = trip.destination.name;
    visibility = trip.visibility;
  }

  if (newFields) {
    if (
      (action === 'create' && Object.keys(newFields).length === 3) ||
      (action === 'update' && Object.keys(newFields).length > 0)
    ) {
      isSaveDisabled = false;
    }

    newVisibility = newFields.visibility;
  }

  return {
    destinationName,
    error,
    isFetching,
    isSaveDisabled: isFetching || isSaveDisabled,
    modalSaveTitle: action === 'create' ? 'Create Trip' : 'Save Changes',
    modalTitle: action === 'create' ? 'Create Trip' : 'Edit Trip',
    showModal,
    title,
    visibility: newVisibility || visibility
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
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

    onSaveTrip() {
      const { action } = ownProps;
      switch (action) {
        case 'create':
          return dispatch(apiCreateTrip());
        case 'update':
          return dispatch(apiUpdateTrip());
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripSettingsModal);

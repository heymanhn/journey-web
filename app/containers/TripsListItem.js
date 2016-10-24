'use strict';

import { connect } from 'react-redux';
import {
  apiDeleteTrip,
  clearHoverOverTrip,
  hoverOverTrip,
  setTripToDelete
} from 'app/actions/trips';
import { showModal, hideModal } from 'app/actions/modals';
import { viewTripPage } from 'app/actions/navigation';
import TripsListItemUI from 'app/components/TripsListItemUI';
import { modalComponents } from 'app/constants';

const mapStateToProps = (state) => {
  const { error, hoverTripId, isFetching } = state.tripsState;
  const { showModal } = state.componentsState.modalsState.deleteTrip;
  return {
    hoverTripId,
    showModal
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { deleteTrip } = modalComponents;
  const tripId = ownProps.trip._id;

  return {
    onClearHoverOverTrip() {
      dispatch(clearHoverOverTrip());
    },

    onHoverOverTrip() {
      dispatch(hoverOverTrip(tripId));
    },

    onShowDeleteTripModal(event) {
      event.stopPropagation();
      dispatch(showModal(deleteTrip));
      dispatch(setTripToDelete(tripId));
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

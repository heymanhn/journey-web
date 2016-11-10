'use strict';

import { connect } from 'react-redux';
import { clearSavedPlace } from 'app/actions/autocomplete';
import { toggleDropdown } from 'app/actions/dropdowns';
import { showAllTripIdeasOnMap } from 'app/actions/map';
import { hideModal } from 'app/actions/modals';
import {
  apiAddTripIdea,
  apiDeleteTripIdea,
  clearNewTripIdea,
  saveIdeaComment,
  saveNewTripIdea
} from 'app/actions/trips';
import TripIdeasList from 'app/components/TripIdeasList';
import { acComponents, modalComponents } from 'app/constants';

const mapStateToProps = (state) => {
  const { user } = state.authState;
  const { showDropdown } = state.componentsState.dropdownsState.addTripIdeas;
  const {
    error,
    isFetching,
    trip,
    tripIdeaToDelete,
    newIdea
  } = state.tripState;
  const { showModal } = state.componentsState.modalsState.deleteTripIdea;

  const { creator, ideas, visibility } = trip;
  return {
    error,
    ideas,
    isFetching,
    isViewOnly: visibility === 'viewOnly' && (!user || user._id !== creator),
    newIdea,
    showDropdown,
    showModal,
    tripIdeaToDelete
  };
};

const mapDispatchToProps = (dispatch) => {
  const { tripIdeaAC } = acComponents;
  const { deleteTripIdea } = modalComponents;

  return {
    onAddIdeaPress() {
      dispatch(apiAddTripIdea());
    },

    onClearSavedPlace() {
      dispatch(clearSavedPlace(tripIdeaAC));
    },

    onClearTripIdea() {
      dispatch(clearNewTripIdea());
    },

    onDeleteTripIdea() {
      dispatch(apiDeleteTripIdea());
    },

    onEnterIdea(idea) {
      dispatch(saveNewTripIdea(idea));
    },

    onEnterIdeaComment(event) {
      dispatch(saveIdeaComment(event.target.value));
    },

    onHide() {
      dispatch(hideModal(deleteTripIdea));
    },

    onShowAllIdeas() {
      dispatch(showAllTripIdeasOnMap());
    },

    onShowDropdown(dropdownId) {
      dispatch(toggleDropdown(dropdownId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripIdeasList);

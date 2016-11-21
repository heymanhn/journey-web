'use strict';

import { connect } from 'react-redux';
import { toggleDropdown } from 'app/actions/dropdowns';
import { showAllTripIdeasOnMap } from 'app/actions/map';
import { hideModal } from 'app/actions/modals';
import { apiDeleteTripIdea } from 'app/actions/trips';
import TripIdeasList from 'app/components/TripIdeasList';
import { acComponents, modalComponents } from 'app/constants';

const mapStateToProps = (state) => {
  const { user } = state.authState;
  const {
    addTripIdeas,
    filterTripIdeas
  } = state.componentsState.dropdownsState;
  const { showDropdown: showAddIdeasDropdown } = addTripIdeas;
  const { showDropdown: showFilterIdeasDropdown } = filterTripIdeas;
  const {
    error,
    isFetching,
    trip,
    tripIdeaToDelete
  } = state.tripState;
  const { showModal } = state.componentsState.modalsState.deleteTripIdea;
  const { creator, ideas, visibility } = trip;

  return {
    error,
    ideas,
    isFetching,
    isViewOnly: visibility === 'viewOnly' && (!user || user._id !== creator),
    showAddIdeasDropdown,
    showFilterIdeasDropdown,
    showModal,
    tripIdeaToDelete
  };
};

const mapDispatchToProps = (dispatch) => {
  const { tripIdeaAC } = acComponents;
  const { deleteTripIdea } = modalComponents;

  return {
    onDeleteTripIdea() {
      dispatch(apiDeleteTripIdea());
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

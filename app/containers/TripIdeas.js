'use strict';

import _ from 'underscore';
import { connect } from 'react-redux';
import { toggleDropdown } from 'app/actions/dropdowns';
import { showAllTripIdeasOnMap } from 'app/actions/map';
import { hideModal } from 'app/actions/modals';
import { apiDeleteTripIdea } from 'app/actions/trips';
import TripIdeasList from 'app/components/TripIdeasList';
import { acComponents, modalComponents } from 'app/constants';

const mapStateToProps = (state) => {
  const { user } = state.authState;
  const { dropdownsState, filtersState, mapState } = state.componentsState;
  const {
    addTripIdeas,
    filterTripIdeas
  } = dropdownsState;
  const { categories: filterCategories } = filtersState;
  const { showDropdown: showAddIdeasDropdown } = addTripIdeas;
  const { showDropdown: showFilterIdeasDropdown } = filterTripIdeas;
  const { visibleIdeas } = mapState;
  const {
    error,
    isFetching,
    trip,
    tripIdeaToDelete
  } = state.tripState;
  const { showModal } = state.componentsState.modalsState.deleteTripIdea;
  const { creator, ideas, visibility } = trip;
  const shouldFilter = (filterCategories.length && showFilterIdeasDropdown);
  const filteredIdeas = shouldFilter ?
    ideas.filter(idea => {
      return (!visibleIdeas || visibleIdeas.includes(idea._id)) &&
        filterCategories.includes(idea.category);
    }) :
    ideas;
  const totalIdeas = shouldFilter ?
    ideas.filter(idea => filterCategories.includes(idea.category)).length :
    ideas.length;

  return {
    error,
    filteredIdeas: _.pluck(filteredIdeas, '_id'),
    ideas,
    isFetching,
    isViewOnly: visibility === 'viewOnly' && (!user || user._id !== creator),
    showAddIdeasDropdown,
    showFilterIdeasDropdown,
    showModal,
    totalIdeas,
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

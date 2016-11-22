'use strict';

import { connect } from 'react-redux';
import {
  clearCategories,
  toggleCategory
} from 'app/actions/filters';
import FilterTripIdeasSection from 'app/components/FilterTripIdeasSection';

const mapStateToProps = state => {
  const { ideaCategories } = state.tripState.trip;
  const { categories: filterCategories } = state.componentsState.filtersState;
  return {
    filterCategories,
    ideaCategories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearFilterCategories() {
      dispatch(clearCategories());
    },

    onToggleFilterCategory(category, event) {
      event.stopPropagation();
      dispatch(toggleCategory(category));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterTripIdeasSection);

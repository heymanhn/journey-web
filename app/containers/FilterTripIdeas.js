'use strict';

import { connect } from 'react-redux';
import {
} from 'app/actions/trips';
import FilterTripIdeasSection from 'app/components/FilterTripIdeasSection';

const mapStateToProps = (state) => {
  const { ideaCategories } = state.tripState.trip;
  return {
    ideaCategories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleFilterCategory(category, event) {
      // Need to distinguish between checkbox and div
      event.stopPropagation();
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterTripIdeasSection);

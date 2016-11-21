'use strict';

import { connect } from 'react-redux';
import { clearSavedPlace } from 'app/actions/autocomplete';
import {
  apiAddTripIdea,
  saveIdeaCategory,
  saveIdeaComment,
  saveNewTripIdea
} from 'app/actions/trips';
import AddTripIdeasSection from 'app/components/AddTripIdeasSection';
import { acComponents } from 'app/constants';

const mapStateToProps = (state) => {
  const { newIdea } = state.tripState;

  return {
    newCategory: newIdea && newIdea.category,
    newIdea
  };
};

const mapDispatchToProps = (dispatch) => {
  const { tripIdeaAC } = acComponents;

  return {
    onAddIdeaPress() {
      dispatch(apiAddTripIdea());
    },

    onClearSavedPlace() {
      dispatch(clearSavedPlace(tripIdeaAC));
    },

    onEnterIdea(idea) {
      dispatch(saveNewTripIdea(idea));
    },

    onEnterIdeaComment(event) {
      dispatch(saveIdeaComment(event.target.value));
    },

    setCategory(category) {
      dispatch(saveIdeaCategory(category));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTripIdeasSection);

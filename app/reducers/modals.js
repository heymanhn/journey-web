'use strict';

import _ from 'underscore';
import { combineReducers } from 'redux';
import {
  SHOW_MODAL,
  HIDE_MODAL
} from 'app/actions/modals';
import { modalComponents, initialModalState } from 'app/constants';

function createModalsReducer(id) {
  return function reducer(state = initialModalState, action) {
    if (action.modalId !== id) {
      return state;
    }

    switch (action.type) {
      case SHOW_MODAL:
        return {
          ...state,
          showModal: true
        };
      case HIDE_MODAL:
        return {
          ...state,
          showModal: false
        };
    }

    return state;
  }
}

const {
  deleteTrip,
  deleteTripIdea,
  tripSettings
} = modalComponents;

const modalsState = combineReducers({
  [deleteTrip]: createModalsReducer(deleteTrip),
  [deleteTripIdea]: createModalsReducer(deleteTripIdea),
  [tripSettings]: createModalsReducer(tripSettings)
});

export default modalsState;

'use strict';

import _ from 'underscore';
import { combineReducers } from 'redux';
import { LOGOUT } from 'app/actions/auth';
import {
  SHOW_DROPDOWN,
  HIDE_DROPDOWN
} from 'app/actions/dropdowns';
import { API_GET_TRIP_REQUEST } from 'app/actions/trips';
import {
  dropdownComponents,
  initialDropdownState
} from 'app/constants';
const { addTripIdeas, filterTripIdeas } = dropdownComponents;

function createDropdownReducer(id) {
  return function reducer(state = initialDropdownState, action) {
    if (action.dropdownId && action.dropdownId !== id) {
      return state;
    }

    switch (action.type) {
      case SHOW_DROPDOWN:
        return {
          ...state,
          showDropdown: true
        };
      case HIDE_DROPDOWN:
        return {
          ...state,
          showDropdown: false
        };
      case API_GET_TRIP_REQUEST:
      case LOGOUT:
        return initialDropdownState;
    }

    return state;
  }
}

const dropdownsState = combineReducers({
  [addTripIdeas]: createDropdownReducer(addTripIdeas),
  [filterTripIdeas]: createDropdownReducer(filterTripIdeas)
});

export default dropdownsState;

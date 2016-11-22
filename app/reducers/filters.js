'use strict';

import _ from 'underscore';
import { LOGOUT } from 'app/actions/auth';
import {
  ADD_CATEGORY,
  CLEAR_CATEGORIES,
  REMOVE_CATEGORY
} from 'app/actions/filters';
import {
  API_GET_TRIP_REQUEST,
  API_UPDATE_TRIP_IDEA_SUCCESS,
  API_DELETE_TRIP_IDEA_SUCCESS
} from 'app/actions/trips';
import { initialFiltersState } from 'app/constants';

export default function filtersState(state = initialFiltersState, action) {
  switch (action.type) {
    case ADD_CATEGORY:
      return {
        ...state,
        categories: state.categories.concat(action.category)
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(c => c !== action.category)
      };
    case API_UPDATE_TRIP_IDEA_SUCCESS:
    case API_DELETE_TRIP_IDEA_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(c => {
          return action.ideaCategories.includes(c);
        })
      };
    case API_GET_TRIP_REQUEST:
    case CLEAR_CATEGORIES:
    case LOGOUT:
      return initialFiltersState;
  }

  return state;
}

'use strict';

import _ from 'underscore';
import {
  SAVE_INPUT,
  API_AUTOCOMPLETE_REQUEST,
  API_AUTOCOMPLETE_SUCCESS,
  API_AUTOCOMPLETE_FAILURE
} from 'app/actions/search';
import { initialSearchState } from 'app/constants';

export default function searchState(state = initialSearchState, action) {
  switch (action.type) {
    case SAVE_INPUT:
      return {
        ...state,
        input: action.input
      };
    case API_AUTOCOMPLETE_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case API_AUTOCOMPLETE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: action.results
      };
    case API_AUTOCOMPLETE_FAILURE:
      return {
        ..._.omit(state, 'input', 'results'),
        isFetching: false,
        error: action.error
      };
  }

  return state;
}

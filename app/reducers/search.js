'use strict';

import _ from 'underscore';
import {
  SAVE_INPUT,
  CLEAR_AUTOCOMPLETE,
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
    case CLEAR_AUTOCOMPLETE:
      return {
        ...state,
        results: []
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
        ...state,
        error: action.error,
        input: '',
        isFetching: false,
        results: []
      };
  }

  return state;
}

'use strict';

import _ from 'underscore';
import {
  SAVE_INPUT,
  CLEAR_AUTOCOMPLETE,
  API_AUTOCOMPLETE_REQUEST,
  API_AUTOCOMPLETE_SUCCESS,
  API_AUTOCOMPLETE_FAILURE,
  API_PLACE_DETAILS_REQUEST,
  API_PLACE_DETAILS_SUCCESS,
  API_PLACE_DETAILS_FAILURE
} from 'app/actions/search';
import {
  API_CREATE_TRIP_SUCCESS,
  API_UPDATE_TRIP_SUCCESS
} from 'app/actions/trips';
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
    case API_PLACE_DETAILS_REQUEST:
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
    case API_PLACE_DETAILS_SUCCESS:
      return {
        ...state,
        isFetching: false
      };
    case API_AUTOCOMPLETE_FAILURE:
    case API_PLACE_DETAILS_FAILURE:
      return {
        ...state,
        error: action.error,
        input: '',
        isFetching: false,
        results: []
      };
    case API_CREATE_TRIP_SUCCESS:
    case API_UPDATE_TRIP_SUCCESS:
      return {
        ..._.omit(state, 'error'),
        input: '',
        results: []
      };
  }

  return state;
}

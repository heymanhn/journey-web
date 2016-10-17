'use strict';

import _ from 'underscore';
import { combineReducers } from 'redux';
import {
  SAVE_INPUT,
  CLEAR_AUTOCOMPLETE,
  API_AUTOCOMPLETE_REQUEST,
  API_AUTOCOMPLETE_SUCCESS,
  API_AUTOCOMPLETE_FAILURE,
  API_PLACE_DETAILS_REQUEST,
  API_PLACE_DETAILS_SUCCESS,
  API_PLACE_DETAILS_FAILURE
} from 'app/actions/autocomplete';
import {
  API_CREATE_TRIP_SUCCESS,
  API_UPDATE_TRIP_SUCCESS,
  CLEAR_SAVED_DEST
} from 'app/actions/trips';
import { acComponents, initialACState } from 'app/constants';

function createAutocompleteReducer(id) {
  return function reducer(state = initialACState, action) {
    if (action.autocompleteId !== id) {
      return state;
    }

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
          isFetchingAC: true
        };
      case API_PLACE_DETAILS_REQUEST:
        return {
          ...state,
          isFetchingPlace: true
        };
      case API_AUTOCOMPLETE_SUCCESS:
        return {
          ...state,
          isFetchingAC: false,
          results: action.results
        };
      case API_PLACE_DETAILS_SUCCESS:
        return {
          ...state,
          isFetchingPlace: false,
          placeSelected: action.placeSelected
        };
      case API_AUTOCOMPLETE_FAILURE:
        return {
          ...state,
          error: action.error,
          isFetchingAC: false,
          results: []
        };
      case API_PLACE_DETAILS_FAILURE:
        return {
          ...state,
          error: action.error,
          isFetchingPlace: false,
          placeSelected: false
        };
      case API_CREATE_TRIP_SUCCESS:
      case API_UPDATE_TRIP_SUCCESS:
        return {
          ..._.omit(state, 'error'),
          input: '',
          placeSelected: false,
          results: []
        };
      case CLEAR_SAVED_DEST:
        return {
          ...state,
          placeSelected: false
        };
    }

    return state;
  }
}

const { createTripAC } = acComponents;
const autocompleteState = combineReducers({
  [createTripAC]: createAutocompleteReducer(createTripAC)
});

export default autocompleteState;

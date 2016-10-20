'use strict';

import _ from 'underscore';
import { combineReducers } from 'redux';
import {
  SAVE_INPUT,
  CLEAR_AUTOCOMPLETE,
  CLEAR_SAVED_PLACE,
  RESET_AUTOCOMPLETE,
  API_AUTOCOMPLETE_REQUEST,
  API_AUTOCOMPLETE_SUCCESS,
  API_AUTOCOMPLETE_FAILURE,
  API_PLACE_DETAILS_REQUEST,
  API_PLACE_DETAILS_SUCCESS,
  API_PLACE_DETAILS_FAILURE
} from 'app/actions/autocomplete';
import { HIDE_MODAL } from 'app/actions/modals';
import {
  API_CREATE_TRIP_SUCCESS,
  API_UPDATE_TRIP_SUCCESS,
  API_ADD_TRIP_IDEA_SUCCESS
} from 'app/actions/trips';
import { acComponents, initialACState, modalComponents } from 'app/constants';
const { tripAC, tripIdeaAC } = acComponents;
const { tripSettings, tripIdeaSettings } = modalComponents;

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
      case CLEAR_SAVED_PLACE:
        return {
          ...state,
          placeSelected: false
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
          placeSelected: true
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
      case API_ADD_TRIP_IDEA_SUCCESS:
        return {
          ..._.omit(state, 'error'),
          input: '',
          placeSelected: false,
          results: []
        };
      case RESET_AUTOCOMPLETE:
        return initialACState;
    }

    return state;
  }
}

const autocompleteState = combineReducers({
  [tripAC]: createAutocompleteReducer(tripAC),
  [tripIdeaAC]: createAutocompleteReducer(tripIdeaAC)
});

export default autocompleteState;

'use strict';

import _ from 'underscore';
import { googleAPI } from 'app/constants';

// Store references to google APIs as module globals
let acService;

/*
 * Action Types
 */

export const SAVE_INPUT = 'SAVE_INPUT';
export const CLEAR_AUTOCOMPLETE = 'CLEAR_AUTOCOMPLETE';
export const API_AUTOCOMPLETE_REQUEST = 'API_AUTOCOMPLETE_REQUEST';
export const API_AUTOCOMPLETE_SUCCESS = 'API_AUTOCOMPLETE_SUCCESS';
export const API_AUTOCOMPLETE_FAILURE = 'API_AUTOCOMPLETE_FAILURE';


/*
 * Action Creators
 */

export function saveInput(input) {
  return {
    type: SAVE_INPUT,
    input
  };
}

export function clearAutocomplete() {
  return {
    type: CLEAR_AUTOCOMPLETE
  };
}

export function apiAutocompleteRequest() {
  return {
    type: API_AUTOCOMPLETE_REQUEST
  };
}

export function apiAutocompleteSuccess(results) {
  const fields = ['description', 'matched_substrings', 'place_id'];
  return {
    type: API_AUTOCOMPLETE_SUCCESS,
    results: results.map(result => _.pick(result, fields))
  };
}

export function apiAutocompleteFailure(error) {
  return {
    type: API_AUTOCOMPLETE_FAILURE,
    error
  };
}


/*
 * Action thunks
 */
export function apiAutocompleteDest(input) {
  return apiAutocomplete({
    input,
    types: ['(regions)']
  });
}

function apiAutocomplete(options) {
  return (dispatch, getState) => {
    if (!options.input) {
      dispatch(apiAutocompleteFailure('ZERO_RESULTS'));
    } else {
      dispatch(saveInput(options.input));
    }

    dispatch(apiAutocompleteRequest());

    function processResults(results, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        return dispatch(apiAutocompleteFailure(status));
      } else {
        return dispatch(apiAutocompleteSuccess(results));
      }
    }

    acService = acService || new google.maps.places.AutocompleteService();
    return acService.getPlacePredictions(options, processResults);
  };
}

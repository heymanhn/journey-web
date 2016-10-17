'use strict';

import _ from 'underscore';
import { googleAPI } from 'app/constants';

// Store references to google APIs as module globals
let acService;
let placesService;

/*
 * Action Types
 */

export const SAVE_INPUT = 'SAVE_INPUT';
export const CLEAR_AUTOCOMPLETE = 'CLEAR_AUTOCOMPLETE';
export const API_AUTOCOMPLETE_REQUEST = 'API_AUTOCOMPLETE_REQUEST';
export const API_AUTOCOMPLETE_SUCCESS = 'API_AUTOCOMPLETE_SUCCESS';
export const API_AUTOCOMPLETE_FAILURE = 'API_AUTOCOMPLETE_FAILURE';
export const API_PLACE_DETAILS_REQUEST = 'API_PLACE_DETAILS_REQUEST';
export const API_PLACE_DETAILS_SUCCESS = 'API_PLACE_DETAILS_SUCCESS';
export const API_PLACE_DETAILS_FAILURE = 'API_PLACE_DETAILS_FAILURE';


/*
 * Action Creators
 */

export function saveInput(autocompleteId, input) {
  return {
    type: SAVE_INPUT,
    autocompleteId,
    input
  };
}

export function clearAutocomplete(autocompleteId) {
  return {
    type: CLEAR_AUTOCOMPLETE,
    autocompleteId
  };
}

export function apiAutocompleteRequest(autocompleteId) {
  return {
    type: API_AUTOCOMPLETE_REQUEST,
    autocompleteId
  };
}

export function apiAutocompleteSuccess(autocompleteId, results) {
  const fields = ['description', 'matched_substrings', 'place_id'];
  return {
    type: API_AUTOCOMPLETE_SUCCESS,
    autocompleteId,
    results: results.map(result => _.pick(result, fields))
  };
}

export function apiAutocompleteFailure(autocompleteId, error) {
  return {
    type: API_AUTOCOMPLETE_FAILURE,
    autocompleteId,
    error
  };
}

export function apiPlaceDetailsRequest(autocompleteId) {
  return {
    type: API_PLACE_DETAILS_REQUEST,
    autocompleteId
  };
}

export function apiPlaceDetailsSuccess(autocompleteId, placeSelected) {
  return {
    type: API_PLACE_DETAILS_SUCCESS,
    autocompleteId,
    placeSelected
  };
}

export function apiPlaceDetailsFailure(autocompleteId, error) {
  return {
    type: API_PLACE_DETAILS_FAILURE,
    autocompleteId,
    error
  };
}


/*
 * Action thunks
 */
export function apiAutocompleteDest(autocompleteId, input) {
  return apiAutocomplete(autocompleteId, {
    input,
    types: ['(regions)']
  });
}

function apiAutocomplete(autocompleteId, options) {
  return (dispatch) => {
    if (!options.input) {
      dispatch(apiAutocompleteFailure(autocompleteId, 'ZERO_RESULTS'));
    } else {
      dispatch(saveInput(autocompleteId, options.input));
    }

    dispatch(apiAutocompleteRequest(autocompleteId));

    function processResults(results, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        return dispatch(apiAutocompleteFailure(autocompleteId, status));
      } else {
        return dispatch(apiAutocompleteSuccess(autocompleteId, results));
      }
    }

    acService = acService || new google.maps.places.AutocompleteService();
    return acService.getPlacePredictions(options, processResults);
  };
}

export function apiPlaceDetails(autocompleteId, placeId, cbAction) {
  return (dispatch) => {
    dispatch(apiPlaceDetailsRequest(autocompleteId));

    function processResult(place, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        return dispatch(apiPlaceDetailsFailure(autocompleteId, status));
      } else {
        dispatch(apiPlaceDetailsSuccess(autocompleteId, true));
        return cbAction && dispatch(cbAction(place));
      }
    }

    const elem = document.createElement('div');
    placesService = placesService || new google.maps.places.PlacesService(elem);
    return placesService.getDetails({ placeId }, processResult);
  };
}

'use strict';

import _ from 'underscore';
import { clearSavedDest, createTripSaveDest } from './trips';
import { acComponents, googleAPI } from 'app/constants';

// Store references to google APIs as module globals
let acService;
let placesService;

/*
 * Action Types
 */

export const SAVE_INPUT = 'SAVE_INPUT';
export const CLEAR_AUTOCOMPLETE = 'CLEAR_AUTOCOMPLETE';
export const CLEAR_SAVED_PLACE = 'CLEAR_SAVED_PLACE';
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

export function clearSavedPlaceAC(autocompleteId) {
  return {
    type: CLEAR_SAVED_PLACE,
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

export function apiAutocomplete(autocompleteId, input) {
  return dispatch => {
    if (!input) {
      return dispatch(apiAutocompleteFailure(autocompleteId, 'ZERO_RESULTS'));
    }

    dispatch(saveInput(autocompleteId, input));
    dispatch(apiAutocompleteRequest(autocompleteId));

    let options = { input };
    if (autocompleteId === acComponents.createTripAC) {
      options.types = ['(regions)'];
    }

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

export function apiFetchPlaceDetails(autocompleteId, placeId) {
  return dispatch => {
    dispatch(apiPlaceDetailsRequest(autocompleteId));

    function processResult(place, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        return dispatch(apiPlaceDetailsFailure(autocompleteId, status));
      } else {
        dispatch(apiPlaceDetailsSuccess(autocompleteId, true));

        switch(autocompleteId) {
          case acComponents.createTripAC:
            return dispatch(createTripSaveDest(place));
        }
      }
    }

    const elem = document.createElement('div');
    placesService = placesService || new google.maps.places.PlacesService(elem);
    return placesService.getDetails({ placeId }, processResult);
  };
}

export function clearSavedPlace(autocompleteId) {
  return dispatch => {
    dispatch(clearSavedPlaceAC(autocompleteId));

    switch(autocompleteId) {
      case acComponents.createTripAC:
        return dispatch(clearSavedDest());
    }
  }
}

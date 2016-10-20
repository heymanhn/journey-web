'use strict';

import _ from 'underscore';
import {
  clearNewTripIdea,
  clearNewTripDestination,
  saveNewTripDestination,
  saveNewTripIdea
} from './trips';
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
export const RESET_AUTOCOMPLETE = 'RESET_AUTOCOMPLETE';
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

export function resetAutocomplete(autocompleteId) {
  return {
    type: RESET_AUTOCOMPLETE,
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

export function apiPlaceDetailsSuccess(autocompleteId) {
  return {
    type: API_PLACE_DETAILS_SUCCESS,
    autocompleteId
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
  return (dispatch, getState) => {
    if (!input) {
      return dispatch(apiAutocompleteFailure(autocompleteId, 'ZERO_RESULTS'));
    }

    dispatch(saveInput(autocompleteId, input));
    dispatch(apiAutocompleteRequest(autocompleteId));

    let options = { input };
    const { tripAC, tripIdeaAC } = acComponents;
    switch(autocompleteId) {
      case tripAC:
        options.types = ['(regions)'];
        break;
      case tripIdeaAC:
        const {
          northeast,
          southwest
        } = getState().tripState.trip.destination.viewport;

        options.bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(
            southwest.coordinates[1],
            southwest.coordinates[0]
          ),
          new google.maps.LatLng(
            northeast.coordinates[1],
            northeast.coordinates[0]
          )
        );
        options.types = ['geocode', 'establishment'];
        break;
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
        dispatch(apiPlaceDetailsSuccess(autocompleteId));

        const { tripAC, tripIdeaAC } = acComponents;
        switch(autocompleteId) {
          case tripAC:
            return dispatch(saveNewTripDestination(place));
          case tripIdeaAC:
            return dispatch(saveNewTripIdea(place));
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

    const { tripAC, tripIdeaAC } = acComponents;
    switch(autocompleteId) {
      case tripAC:
        return dispatch(clearNewTripDestination());
      case tripIdeaAC:
        return dispatch(clearNewTripIdea());
    }
  }
}

export function setDefaultPlace(autocompleteId, placeName) {
  return dispatch => {
    dispatch(saveInput(autocompleteId, placeName));
    return dispatch(apiPlaceDetailsSuccess(autocompleteId));
  }
}

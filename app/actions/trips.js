'use strict';

import _ from 'underscore';
import fetch from 'isomorphic-fetch';
import ObjectID from 'bson-objectid';

import { viewTripPage } from './navigation';
import { apiPlaceDetails } from './autocomplete';
import { hideModal } from './modals';
import {
  acComponents,
  fetchOptsTemplate,
  getCategoryForIdeaTypes,
  handleErrors,
  journeyAPI,
  modalComponents
} from 'app/constants';

/*
 * Action Types
 */

// Get Trips
export const API_GET_TRIPS_REQUEST = 'API_GET_TRIPS_REQUEST';
export const API_GET_TRIPS_SUCCESS = 'API_GET_TRIPS_SUCCESS';
export const API_GET_TRIPS_FAILURE = 'API_GET_TRIPS_FAILURE';

// Hover over trips on Trips page
export const HOVER_OVER_TRIP = 'HOVER_OVER_TRIP';
export const CLEAR_HOVER_OVER_TRIP = 'CLEAR_HOVER_OVER_TRIP';

// Create or Update Trip
export const SAVE_NEW_TRIP_TITLE = 'SAVE_NEW_TRIP_TITLE';
export const SAVE_NEW_TRIP_DESTINATION = 'SAVE_NEW_TRIP_DESTINATION';
export const SAVE_NEW_TRIP_VISIBILITY = 'SAVE_NEW_TRIP_VISIBILITY';
export const CLEAR_NEW_TRIP_TITLE = 'CLEAR_NEW_TRIP_TITLE';
export const CLEAR_NEW_TRIP_DESTINATION = 'CLEAR_NEW_TRIP_DESTINATION';
export const API_CREATE_TRIP_REQUEST = 'API_CREATE_TRIP_REQUEST';
export const API_CREATE_TRIP_SUCCESS = 'API_CREATE_TRIP_SUCCESS';
export const API_CREATE_TRIP_FAILURE = 'API_CREATE_TRIP_FAILURE';
export const API_UPDATE_TRIP_VIS_REQUEST = 'API_UPDATE_TRIP_VIS_REQUEST';
export const API_UPDATE_TRIP_REQUEST = 'API_UPDATE_TRIP_REQUEST';
export const API_UPDATE_TRIP_SUCCESS = 'API_UPDATE_TRIP_SUCCESS';
export const API_UPDATE_TRIP_FAILURE = 'API_UPDATE_TRIP_FAILURE';

// Get a trip
export const API_GET_TRIP_REQUEST = 'API_GET_TRIP_REQUEST';
export const API_GET_TRIP_SUCCESS = 'API_GET_TRIP_SUCCESS';
export const API_GET_TRIP_FAILURE = 'API_GET_TRIP_FAILURE';

// Delete a trip
export const SET_TRIP_TO_DELETE = 'SET_TRIP_TO_DELETE';
export const API_DELETE_TRIP_REQUEST = 'API_DELETE_TRIP_REQUEST';
export const API_DELETE_TRIP_SUCCESS = 'API_DELETE_TRIP_SUCCESS';
export const API_DELETE_TRIP_FAILURE = 'API_DELETE_TRIP_FAILURE';

// Create new trip idea
export const SAVE_NEW_TRIP_IDEA = 'SAVE_NEW_TRIP_IDEA';
export const CLEAR_NEW_TRIP_IDEA = 'CLEAR_NEW_TRIP_IDEA';
export const SAVE_IDEA_CATEGORY = 'SAVE_IDEA_CATEGORY';
export const SAVE_IDEA_COMMENT = 'SAVE_IDEA_COMMENT';
export const API_ADD_TRIP_IDEA_REQUEST = 'API_ADD_TRIP_IDEA_REQUEST';
export const API_ADD_TRIP_IDEA_SUCCESS = 'API_ADD_TRIP_IDEA_SUCCESS';
export const API_ADD_TRIP_IDEA_FAILURE = 'API_ADD_TRIP_IDEA_FAILURE';

// Update trip ideas
export const SET_IDEA_INDEX_TO_UPDATE = 'SET_IDEA_INDEX_TO_UPDATE';
export const REORDER_TRIP_IDEA = 'REORDER_TRIP_IDEA';
export const SAVE_IDEA_UPDATED_CATEGORY = 'SAVE_IDEA_UPDATED_CATEGORY';
export const SAVE_IDEA_UPDATED_COMMENT = 'SAVE_IDEA_UPDATED_COMMENT';
export const API_UPDATE_TRIP_IDEA_REQUEST = 'API_UPDATE_TRIP_IDEA_REQUEST';
export const API_UPDATE_TRIP_IDEA_SUCCESS = 'API_UPDATE_TRIP_IDEA_SUCCESS';
export const API_UPDATE_TRIP_IDEA_FAILURE = 'API_UPDATE_TRIP_IDEA_FAILURE';

// Delete a trip idea
export const SET_TRIP_IDEA_TO_DELETE = 'SET_TRIP_IDEA_TO_DELETE';
export const DELETE_TRIP_IDEA = 'DELETE_TRIP_IDEA';
export const API_DELETE_TRIP_IDEA_REQUEST = 'API_DELETE_TRIP_IDEA_REQUEST';
export const API_DELETE_TRIP_IDEA_SUCCESS = 'API_DELETE_TRIP_IDEA_SUCCESS';
export const API_DELETE_TRIP_IDEA_FAILURE = 'API_DELETE_TRIP_IDEA_FAILURE';

// Trip idea hover and focus states
export const SET_HOVER_LNGLAT = 'SET_HOVER_LNGLAT';
export const CLEAR_HOVER_LNGLAT = 'CLEAR_HOVER_LNGLAT';
export const SET_FOCUS_LNGLAT = 'SET_FOCUS_LNGLAT';
export const CLEAR_FOCUS_LNGLAT = 'CLEAR_FOCUS_LNGLAT';

// Trip idea editing states
export const SET_EDITING_IDEA = 'SET_EDITING_IDEA';
export const CLEAR_EDITING_IDEA = 'CLEAR_EDITING_IDEA';

// Trip Errors
export const CLEAR_TRIPS_ERROR = 'CLEAR_TRIPS_ERROR';
export const CLEAR_TRIP_ERROR = 'CLEAR_TRIP_ERROR';


/*
 * Action Creators
 */

// Get Trips
export function apiGetTripsRequest() {
  return {
    type: API_GET_TRIPS_REQUEST
  };
}

export function apiGetTripsSuccess(json) {
  return {
    type: API_GET_TRIPS_SUCCESS,
    trips: json.trips
  };
}

export function apiGetTripsFailure(error) {
  return {
    type: API_GET_TRIPS_FAILURE,
    error
  };
}


// Hover over trip on Trips page
export function hoverOverTrip(tripId) {
  return {
    type: HOVER_OVER_TRIP,
    tripId
  };
}

export function clearHoverOverTrip() {
  return {
    type: CLEAR_HOVER_OVER_TRIP
  };
}


// Create or Update a Trip
export function saveNewTripTitle(title) {
  return {
    type: SAVE_NEW_TRIP_TITLE,
    title
  };
}

export function saveNewTripDestination(destination) {
  return {
    type: SAVE_NEW_TRIP_DESTINATION,
    destination: formatDestination(destination)
  };
}

export function saveNewTripVisibility(visibility) {
  return {
    type: SAVE_NEW_TRIP_VISIBILITY,
    visibility
  };
}

export function clearNewTripTitle() {
  return {
    type: CLEAR_NEW_TRIP_TITLE
  };
}

export function clearNewTripDestination() {
  return {
    type: CLEAR_NEW_TRIP_DESTINATION
  };
}

export function apiCreateTripRequest() {
  return {
    type: API_CREATE_TRIP_REQUEST
  };
}

export function apiCreateTripSuccess(json) {
  return {
    type: API_CREATE_TRIP_SUCCESS,
    autocompleteId: acComponents.tripAC,
    trip: json.trip
  };
}

export function apiCreateTripFailure(error) {
  return {
    type: API_CREATE_TRIP_FAILURE,
    error
  };
}

export function apiUpdateTripVisRequest() {
  return {
    type: API_UPDATE_TRIP_VIS_REQUEST
  };
}

export function apiUpdateTripRequest() {
  return {
    type: API_UPDATE_TRIP_REQUEST
  };
}

export function apiUpdateTripSuccess(json) {
  return {
    type: API_UPDATE_TRIP_SUCCESS,
    autocompleteId: acComponents.tripAC,
    trip: json.trip
  };
}

export function apiUpdateTripFailure(error) {
  return {
    type: API_UPDATE_TRIP_FAILURE,
    error
  };
}


// Get a Trip
export function apiGetTripRequest() {
  return {
    type: API_GET_TRIP_REQUEST
  };
}

export function apiGetTripSuccess(json) {
  return {
    type: API_GET_TRIP_SUCCESS,
    trip: json.trip
  };
}

export function apiGetTripFailure(error) {
  if (error === 'Not Authorized') {
    error = 'Trip Not Found';
  }

  return {
    type: API_GET_TRIP_FAILURE,
    error
  };
}


// Delete a Trip
export function setTripToDelete(tripId) {
  return {
    type: SET_TRIP_TO_DELETE,
    tripId
  };
}

export function apiDeleteTripRequest() {
  return {
    type: API_DELETE_TRIP_REQUEST
  };
}

export function apiDeleteTripSuccess() {
  return {
    type: API_DELETE_TRIP_SUCCESS
  };
}

export function apiDeleteTripFailure(error) {
  return {
    type: API_DELETE_TRIP_FAILURE,
    error
  };
}

// Create a trip idea
export function saveNewTripIdea(place) {
  const loc = place.geometry.location;

  // Format the Google place object to the right shape
  let types = place.types || [];
  let idea = {
    googlePlaceId: place.place_id,
    name: place.name,
    category: getCategoryForIdeaTypes(types),
    loc: {
      type: 'Point',
      coordinates: [loc.lng(), loc.lat()]
    },
    address: place.formatted_address,
    phone: place.international_phone_number,
    types,
    photo: place.photos ? place.photos[0].getUrl({ 'maxWidth': 300 }) : '',
    url: place.url
  };

  return {
    type: SAVE_NEW_TRIP_IDEA,
    idea
  };
}

export function clearNewTripIdea() {
  return {
    type: CLEAR_NEW_TRIP_IDEA
  };
}

export function saveIdeaCategory(category) {
  return {
    type: SAVE_IDEA_CATEGORY,
    category
  };
}

export function saveIdeaComment(comment) {
  return {
    type: SAVE_IDEA_COMMENT,
    comment
  };
}

export function apiAddTripIdeaRequest() {
  return {
    type: API_ADD_TRIP_IDEA_REQUEST
  };
}

export function apiAddTripIdeaSuccess(json) {
  return {
    type: API_ADD_TRIP_IDEA_SUCCESS,
    autocompleteId: acComponents.tripIdeaAC,
    ideas: json.ideas
  };
}

export function apiAddTripIdeaFailure(error) {
  return {
    type: API_ADD_TRIP_IDEA_FAILURE,
    error
  };
}

// Update a trip idea
export function setIdeaIndexToUpdate(index) {
  return {
    type: SET_IDEA_INDEX_TO_UPDATE,
    index
  };
}

export function reorderTripIdea(index1, index2) {
  return {
    type: REORDER_TRIP_IDEA,
    index1,
    index2
  };
}

export function saveIdeaUpdatedCategory(category) {
  return {
    type: SAVE_IDEA_UPDATED_CATEGORY,
    category
  };
}

export function saveIdeaUpdatedComment(comment) {
  return {
    type: SAVE_IDEA_UPDATED_COMMENT,
    comment
  };
}

export function apiUpdateTripIdeaRequest() {
  return {
    type: API_UPDATE_TRIP_IDEA_REQUEST
  };
}

export function apiUpdateTripIdeaSuccess(json) {
  return {
    type: API_UPDATE_TRIP_IDEA_SUCCESS,
    ideas: json.ideas
  };
}

export function apiUpdateTripIdeaFailure(error) {
  return {
    type: API_UPDATE_TRIP_IDEA_FAILURE,
    error
  };
}

// Delete a trip idea
export function setTripIdeaToDelete(ideaId) {
  return {
    type: SET_TRIP_IDEA_TO_DELETE,
    ideaId
  };
}

export function apiDeleteTripIdeaRequest() {
  return {
    type: API_DELETE_TRIP_IDEA_REQUEST
  };
}

export function apiDeleteTripIdeaSuccess(json) {
  return {
    type: API_DELETE_TRIP_IDEA_SUCCESS,
    ideas: json.ideas
  };
}

export function apiDeleteTripIdeaFailure(error) {
  return {
    type: API_DELETE_TRIP_IDEA_FAILURE,
    error
  };
}

// Trip idea hover and focus states
export function setHoverLngLat(lngLat) {
  return {
    type: SET_HOVER_LNGLAT,
    lngLat
  };
}

export function clearHoverLngLat() {
  return {
    type: CLEAR_HOVER_LNGLAT
  };
}

export function setFocusLngLat(lngLat) {
  return {
    type: SET_FOCUS_LNGLAT,
    lngLat
  };
}

export function clearFocusLngLat() {
  return {
    type: CLEAR_FOCUS_LNGLAT
  };
}

// Trip idea editing states
export function setEditingIdea(ideaId) {
  return {
    type: SET_EDITING_IDEA,
    ideaId
  };
}

export function clearEditingIdea() {
  return {
    type: CLEAR_EDITING_IDEA
  };
}

// Trip Errors
export function clearTripsError() {
  return {
    type: CLEAR_TRIPS_ERROR
  };
}

export function clearTripError() {
  return {
    type: CLEAR_TRIP_ERROR
  };
}


/*
 * Action Creator thunks
 */

export function apiGetTrips() {
  return (dispatch, getState) => {
    dispatch(apiGetTripsRequest());

    const { user } = getState().authState;
    const userTrips = journeyAPI.trips.get(user._id);
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: userTrips.method
    };

    return fetch(userTrips.route, opts)
      .then(handleErrors.bind(null, dispatch))
      .then(response => response.json())
      .then(json => dispatch(apiGetTripsSuccess(json)))
      .catch(error => error && dispatch(apiGetTripsFailure(error.message)));
  };
}

export function apiCreateTrip() {
  return (dispatch, getState) => {
    dispatch(apiCreateTripRequest());

    // Format the destination object before saving
    let { newFields } = getState().tripState;

    if (!newFields) {
      return;
    }

    newFields.visibility = newFields.visibility || 'public';
    const createTrip = journeyAPI.trips.create();
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: createTrip.method,
      body: JSON.stringify(newFields)
    };

    return fetch(createTrip.route, opts)
      .then(handleErrors.bind(null, dispatch))
      .then(response => response.json())
      .then(json => {
        const tripId = json.trip._id;
        dispatch(apiCreateTripSuccess(json));
        dispatch(viewTripPage(tripId));
        dispatch(hideModal(modalComponents.tripSettings));
        dispatch(apiGetTrips());
      })
      .catch(error => error && dispatch(apiCreateTripFailure(error.message)));
  };
}

export function apiGetTrip(tripId) {
  return (dispatch, getState) => {
    dispatch(apiGetTripRequest());

    const userTrip = journeyAPI.trip.get(tripId);
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: userTrip.method
    };

    return fetch(userTrip.route, opts)
      .then(handleErrors.bind(null, dispatch))
      .then(response => response.json())
      .then(json => {
        dispatch(apiGetTripSuccess(json));
      })
      .catch(error => error && dispatch(apiGetTripFailure(error.message)));
  };
}

export function apiUpdateTrip(visibility) {
  return (dispatch, getState) => {
    const { trip: { _id: tripId }, newFields } = getState().tripState;

    let params = {};
    if (visibility) {
      dispatch(apiUpdateTripVisRequest());
      params.visibility = visibility;
    } else {
      if (!newFields) {
        return;
      } else {
        dispatch(apiUpdateTripRequest());
        params = newFields;
      }
    }

    const updateTripAPI = journeyAPI.trip.update(tripId);
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: updateTripAPI.method,
      body: JSON.stringify(params)
    };

    return fetch(updateTripAPI.route, opts)
      .then(handleErrors.bind(null, dispatch))
      .then(response => response.json())
      .then(json => {
        dispatch(apiUpdateTripSuccess(json));
        dispatch(hideModal(modalComponents.tripSettings));
      })
      .catch(error => error && dispatch(apiUpdateTripFailure(error.message)));
  };
}

export function apiDeleteTrip() {
  return (dispatch, getState) => {
    dispatch(apiDeleteTripRequest());

    const tripId = getState().tripsState.tripToDelete;
    const deleteTripAPI = journeyAPI.trip.delete(tripId);
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: deleteTripAPI.method
    };

    return fetch(deleteTripAPI.route, opts)
      .then(handleErrors.bind(null, dispatch))
      .then(response => response.json())
      .then(json => {
        dispatch(apiDeleteTripSuccess(json));
        dispatch(hideModal(modalComponents.deleteTrip));
      })
      .catch(error => error && dispatch(apiDeleteTripFailure(error.message)));
  };
}

export function apiAddTripIdea() {
  return (dispatch, getState) => {
    dispatch(apiAddTripIdeaRequest());

    // Format the idea object before saving
    const ts = getState().tripState;
    const tripId = ts.trip._id;
    const idea = ts.newIdea;
    const comment = ts.newComment;

    if (ts.newComment) {
      idea.comment = ts.newComment;
    }

    const addTripIdeaAPI = journeyAPI.trip.ideas.create(tripId);
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: addTripIdeaAPI.method,
      body: JSON.stringify(idea)
    };

    return fetch(addTripIdeaAPI.route, opts)
      .then(handleErrors.bind(null, dispatch))
      .then(response => response.json())
      .then(json => {
        dispatch(apiAddTripIdeaSuccess(json));
      })
      .catch(error => error && dispatch(apiAddTripIdeaFailure(error.message)));
  };
}

export function apiUpdateTripIdea(index) {
  return (dispatch, getState) => {
    dispatch(apiUpdateTripIdeaRequest());

    const {
      ideaIndexToUpdate,
      newCategory,
      newComment,
      trip: { _id: tripId, ideas }
    } = getState().tripState;
    index = typeof index === 'number' ? index : ideaIndexToUpdate;
    const ideaId = ideas[index]._id;
    const params = { index };

    if (newComment) {
      params.comment = newComment;
    }

    if (newCategory) {
      params.category = newCategory;
    }

    const updateTripIdeaAPI = journeyAPI.trip.ideas.update(tripId, ideaId);
    let opts ={
      ...fetchOptsTemplate(getState().authState),
      method: updateTripIdeaAPI.method,
      body: JSON.stringify(params)
    };

    return fetch(updateTripIdeaAPI.route, opts)
      .then(handleErrors.bind(null, dispatch))
      .then(response => response.json())
      .then(json => dispatch(apiUpdateTripIdeaSuccess(json)))
      .catch(error => {
        return error && dispatch(apiUpdateTripIdeaFailure(error.message));
      });
  };
}

export function apiDeleteTripIdea() {
  return (dispatch, getState) => {
    const { tripIdeaToDelete: ideaId } = getState().tripState;
    dispatch(apiDeleteTripIdeaRequest());

    const tripId = getState().tripState.trip._id;
    const deleteTripIdeaAPI = journeyAPI.trip.ideas.delete(tripId, ideaId);
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: deleteTripIdeaAPI.method
    };

    return fetch(deleteTripIdeaAPI.route, opts)
      .then(handleErrors.bind(null, dispatch))
      .then(response => response.json())
      .then(json => {
        dispatch(apiDeleteTripIdeaSuccess(json));
        dispatch(hideModal(modalComponents.deleteTripIdea))
      })
      .catch(error => {
        return error && dispatch(apiDeleteTripIdeaFailure(error.message));
      });
  };
}


// Helper functions
function formatDestination(destination) {
  const {
    formatted_address,
    geometry: {
      location: loc,
      viewport
    },
    name,
    place_id,
    types
  } = destination;

  return {
    googlePlaceId: place_id,
    name,
    formattedAddress: formatted_address,
    loc: {
      type: 'Point',
      coordinates: [loc.lng(), loc.lat()]
    },
    viewport: {
      northeast: {
        type: 'Point',
        coordinates: [viewport.b.f, viewport.f.b]
      },
      southwest: {
        type: 'Point',
        coordinates: [viewport.b.b, viewport.f.f]
      }
    },
    types
  };
}

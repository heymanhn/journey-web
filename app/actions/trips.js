'use strict';

import _ from 'underscore';
import fetch from 'isomorphic-fetch';
import ObjectID from 'bson-objectid';

import { viewTripPage } from './navigation';
import { apiPlaceDetails } from './autocomplete';
import {
  acComponents,
  fetchOptsTemplate,
  handleErrors,
  journeyAPI
} from 'app/constants';

/*
 * Action Types
 */

// Get Trips
export const API_GET_TRIPS_REQUEST = 'API_GET_TRIPS_REQUEST';
export const API_GET_TRIPS_SUCCESS = 'API_GET_TRIPS_SUCCESS';
export const API_GET_TRIPS_FAILURE = 'API_GET_TRIPS_FAILURE';

// Create Trip
export const CREATE_TRIP_SAVE_TITLE = 'CREATE_TRIP_SAVE_TITLE';
export const CREATE_TRIP_SAVE_DEST = 'CREATE_TRIP_SAVE_DEST';
export const CREATE_TRIP_SAVE_VISIBILITY = 'CREATE_TRIP_SAVE_VISIBILITY';
export const CLEAR_SAVED_DEST = 'CLEAR_SAVED_DEST';
export const API_CREATE_TRIP_REQUEST = 'API_CREATE_TRIP_REQUEST';
export const API_CREATE_TRIP_SUCCESS = 'API_CREATE_TRIP_SUCCESS';
export const API_CREATE_TRIP_FAILURE = 'API_CREATE_TRIP_FAILURE';

// Get a trip
export const API_GET_TRIP_REQUEST = 'API_GET_TRIP_REQUEST';
export const API_GET_TRIP_SUCCESS = 'API_GET_TRIP_SUCCESS';
export const API_GET_TRIP_FAILURE = 'API_GET_TRIP_FAILURE';

// Update a trip
export const UPDATE_TRIP_SAVE_DEST = 'UPDATE_TRIP_SAVE_DEST';
export const UPDATE_TRIP_CLEAR_DEST = 'UPDATE_TRIP_CLEAR_DEST';
export const UPDATE_TRIP_SAVE_TITLE = 'UPDATE_TRIP_SAVE_TITLE';
export const UPDATE_TRIP_SAVE_VIS = 'UPDATE_TRIP_SAVE_VIS';
export const API_UPDATE_TRIP_VIS_REQUEST = 'API_UPDATE_TRIP_VIS_REQUEST';
export const API_UPDATE_TRIP_REQUEST = 'API_UPDATE_TRIP_REQUEST';
export const API_UPDATE_TRIP_SUCCESS = 'API_UPDATE_TRIP_SUCCESS';
export const API_UPDATE_TRIP_FAILURE = 'API_UPDATE_TRIP_FAILURE';

// Delete a trip
export const DELETE_TRIP = 'DELETE_TRIP';
export const API_DELETE_TRIP_REQUEST = 'API_DELETE_TRIP_REQUEST';
export const API_DELETE_TRIP_SUCCESS = 'API_DELETE_TRIP_SUCCESS';
export const API_DELETE_TRIP_FAILURE = 'API_DELETE_TRIP_FAILURE';

// Create new trip idea
export const SAVE_NEW_TRIP_IDEA = 'SAVE_NEW_TRIP_IDEA';
export const CLEAR_NEW_TRIP_IDEA = 'CLEAR_NEW_TRIP_IDEA';
export const SAVE_IDEA_COMMENT = 'SAVE_IDEA_COMMENT';
export const ADD_TRIP_IDEA = 'ADD_TRIP_IDEA';
export const API_ADD_TRIP_IDEA_REQUEST = 'API_ADD_TRIP_IDEA_REQUEST';
export const API_ADD_TRIP_IDEA_SUCCESS = 'API_ADD_TRIP_IDEA_SUCCESS';
export const API_ADD_TRIP_IDEA_FAILURE = 'API_ADD_TRIP_IDEA_FAILURE';

// Update trip ideas
export const REORDER_TRIP_IDEA = 'REORDER_TRIP_IDEA';
export const API_UPDATE_TRIP_IDEA_REQUEST = 'API_UPDATE_TRIP_IDEA_REQUEST';
export const API_UPDATE_TRIP_IDEA_SUCCESS = 'API_UPDATE_TRIP_IDEA_SUCCESS';
export const API_UPDATE_TRIP_IDEA_FAILURE = 'API_UPDATE_TRIP_IDEA_FAILURE';

// Remove a trip idea
export const REMOVE_TRIP_IDEA = 'REMOVE_TRIP_IDEA';
export const API_REMOVE_TRIP_IDEA_REQUEST = 'API_REMOVE_TRIP_IDEA_REQUEST';
export const API_REMOVE_TRIP_IDEA_SUCCESS = 'API_REMOVE_TRIP_IDEA_SUCCESS';
export const API_REMOVE_TRIP_IDEA_FAILURE = 'API_REMOVE_TRIP_IDEA_FAILURE';

// Trip idea hover and focus states
export const SET_HOVER_LNGLAT = 'SET_HOVER_LNGLAT';
export const CLEAR_HOVER_LNGLAT = 'CLEAR_HOVER_LNGLAT';
export const SET_FOCUS_LNGLAT = 'SET_FOCUS_LNGLAT';
export const CLEAR_FOCUS_LNGLAT = 'CLEAR_FOCUS_LNGLAT';

// Trip Errors
export const CLEAR_TRIPS_ERROR = 'CLEAR_TRIPS_ERROR';
export const CLEAR_TRIP_ERROR = 'CLEAR_TRIP_ERROR';

// Trip Settings Modal
export const SHOW_TRIP_SETTINGS_MODAL = 'SHOW_TRIP_SETTINGS_MODAL';
export const HIDE_TRIP_SETTINGS_MODAL = 'HIDE_TRIP_SETTINGS_MODAL';

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

// Create Trip
export function createTripSaveTitle(title) {
  return {
    type: CREATE_TRIP_SAVE_TITLE,
    title
  };
}

export function createTripSaveDest(destination) {
  return {
    type: CREATE_TRIP_SAVE_DEST,
    destination: formatDestination(destination)
  };
}

export function createTripSaveVisibility(visibility) {
  return {
    type: CREATE_TRIP_SAVE_VISIBILITY,
    visibility
  };
}

export function clearSavedDest() {
  return {
    type: CLEAR_SAVED_DEST
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
    autocompleteId: acComponents.createTripAC,
    trip: json.trip
  };
}

export function apiCreateTripFailure(error) {
  return {
    type: API_CREATE_TRIP_FAILURE,
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
  return {
    type: API_GET_TRIP_FAILURE,
    error
  };
}

// Update a trip
export function updateTripSaveDest(destination) {
  return {
    type: UPDATE_TRIP_SAVE_DEST,
    destination: formatDestination(destination)
  };
}

export function updateTripClearDest() {
  return {
    type: UPDATE_TRIP_CLEAR_DEST
  };
}

export function updateTripSaveTitle(title) {
  return {
    type: UPDATE_TRIP_SAVE_TITLE,
    title
  };
}

export function updateTripSaveVis(visibility) {
  return {
    type: UPDATE_TRIP_SAVE_VIS,
    visibility
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
    autocompleteId: acComponents.updateTripAC,
    trip: json.trip
  };
}

export function apiUpdateTripFailure(error) {
  return {
    type: API_UPDATE_TRIP_FAILURE,
    error
  };
}


// Delete a Trip
export function deleteTrip(tripId) {
  return {
    type: DELETE_TRIP,
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
  let idea = {
    googlePlaceId: place.place_id,
    name: place.name,
    loc: {
      type: 'Point',
      coordinates: [loc.lng(), loc.lat()]
    },
    address: place.formatted_address,
    phone: place.international_phone_number,
    types: place.types,
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

export function saveIdeaComment(comment) {
  return {
    type: SAVE_IDEA_COMMENT,
    comment
  };
}

export function addTripIdea(idea) {
  return {
    type: ADD_TRIP_IDEA,
    idea
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
export function reorderTripIdea(index1, index2) {
  return {
    type: REORDER_TRIP_IDEA,
    index1,
    index2
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

// Remove a trip idea
export function removeTripIdea(ideaId) {
  return {
    type: REMOVE_TRIP_IDEA,
    ideaId
  };
}

export function apiRemoveTripIdeaRequest() {
  return {
    type: API_REMOVE_TRIP_IDEA_REQUEST
  };
}

export function apiRemoveTripIdeaSuccess(json) {
  return {
    type: API_REMOVE_TRIP_IDEA_SUCCESS,
    ideas: json.ideas
  };
}

export function apiRemoveTripIdeaFailure(error) {
  return {
    type: API_REMOVE_TRIP_IDEA_FAILURE,
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

// Trip Settings Modal
export function showTripSettingsModal() {
  return {
    type: SHOW_TRIP_SETTINGS_MODAL
  };
}

export function hideTripSettingsModal() {
  return {
    type: HIDE_TRIP_SETTINGS_MODAL
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
      .then(handleErrors)
      .then(response => response.json())
      .then(json => dispatch(apiGetTripsSuccess(json)))
      .catch(error => { dispatch(apiGetTripsFailure(error.message)); });
  };
}

export function apiCreateTrip() {
  return (dispatch, getState) => {
    dispatch(apiCreateTripRequest());

    // Format the destination object before saving
    const title = getState().tripsState.newTitle;
    const destination = getState().tripsState.newDestination;
    const visibility = getState().tripsState.newVisibility || 'public';

    const createTrip = journeyAPI.trips.create();
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: createTrip.method,
      body: JSON.stringify({ title, destination, visibility })
    };

    return fetch(createTrip.route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        const tripId = json.trip._id;
        dispatch(apiCreateTripSuccess(json));
        dispatch(viewTripPage(tripId));
      })
      .catch(error => { dispatch(apiCreateTripFailure(error.message)); });
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
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiGetTripSuccess(json));
      })
      .catch(error => { dispatch(apiGetTripFailure(error.message)); });
  };
}

export function apiUpdateTrip(visibility) {
  return (dispatch, getState) => {
    const { trip: { _id: tripId }, updatedFields } = getState().tripState;
    let params = {};
    if (visibility) {
      dispatch(apiUpdateTripVisRequest());
      params.visibility = visibility;
    } else {
      dispatch(apiUpdateTripRequest());
      params = updatedFields;
    }

    const updateTripAPI = journeyAPI.trip.update(tripId);
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: updateTripAPI.method,
      body: JSON.stringify(params)
    };

    return fetch(updateTripAPI.route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiUpdateTripSuccess(json));
        dispatch(hideTripSettingsModal());
      })
      .catch(error => { dispatch(apiUpdateTripFailure(error.message)); });
  };
}

export function apiDeleteTrip(tripId) {
  return (dispatch, getState) => {
    dispatch(deleteTrip(tripId)); // Update UI state first
    dispatch(apiDeleteTripRequest());

    const deleteTripAPI = journeyAPI.trip.delete(tripId);
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: deleteTripAPI.method
    };

    return fetch(deleteTripAPI.route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiDeleteTripSuccess(json));
        dispatch(apiGetTrips());
      })
      .catch(error => { dispatch(apiDeleteTripFailure(error.message)); });
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

    // Update UI state first, using a stubbed idea ID
    const _id = ObjectID().toString();
    dispatch(addTripIdea(_.extend(idea, { _id })));

    const addTripIdeaAPI = journeyAPI.trip.ideas.create(tripId);
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: addTripIdeaAPI.method,
      body: JSON.stringify(idea)
    };

    return fetch(addTripIdeaAPI.route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiAddTripIdeaSuccess(json));
      })
      .catch(error => { dispatch(apiAddTripIdeaFailure(error.message)); });
  };
}

// Only supports reordering trip ideas for now
export function apiUpdateTripIdea(index) {
  return (dispatch, getState) => {
    dispatch(apiUpdateTripIdeaRequest());

    const ts = getState().tripState;
    const tripId = ts.trip._id;
    const ideaId = ts.trip.ideas[index]._id;

    const updateTripIdeaAPI = journeyAPI.trip.ideas.update(tripId, ideaId);
    let opts ={
      ...fetchOptsTemplate(getState().authState),
      method: updateTripIdeaAPI.method,
      body: JSON.stringify({ index })
    };

    return fetch(updateTripIdeaAPI.route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiUpdateTripIdeaSuccess(json));
      })
      .catch(error => { dispatch(apiUpdateTripIdeaFailure(error.message)); });
  };
}

export function apiRemoveTripIdea(ideaId) {
  return (dispatch, getState) => {
    dispatch(removeTripIdea(ideaId)); // Update UI state first
    dispatch(apiRemoveTripIdeaRequest());

    const tripId = getState().tripState.trip._id;
    const removeTripIdeaAPI = journeyAPI.trip.ideas.delete(tripId, ideaId);
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: removeTripIdeaAPI.method
    };

    return fetch(removeTripIdeaAPI.route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiRemoveTripIdeaSuccess(json));
      })
      .catch(error => { dispatch(apiRemoveTripIdeaFailure(error.message)); });
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

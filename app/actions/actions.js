'use strict';

import fetch from 'isomorphic-fetch';
import { viewTripsPage, viewTripPage } from './navigation'
import { journeyAPI } from '../constants';

/*
 * Action Types
 */

// Authentication
export const LOGIN_SAVE_EMAIL = 'LOGIN_SAVE_EMAIL';
export const LOGIN_SAVE_PASSWORD = 'LOGIN_SAVE_PASSWORD';
export const SIGNUP_SAVE_NAME = 'SIGNUP_SAVE_NAME';
export const SIGNUP_SAVE_EMAIL = 'SIGNUP_SAVE_EMAIL';
export const SIGNUP_SAVE_PASSWORD = 'SIGNUP_SAVE_PASSWORD';
export const API_LOGIN_REQUEST = 'API_LOGIN_REQUEST';
export const API_LOGIN_SUCCESS = 'API_LOGIN_SUCCESS';
export const API_LOGIN_FAILURE = 'API_LOGIN_FAILURE';
export const API_SIGNUP_REQUEST = 'API_SIGNUP_REQUEST';
export const API_SIGNUP_SUCCESS = 'API_SIGNUP_SUCCESS';
export const API_SIGNUP_FAILURE = 'API_SIGNUP_FAILURE';
export const LOGOUT = 'LOGOUT';

// Trip Management
export const CREATE_TRIP_SAVE_TITLE = 'CREATE_TRIP_SAVE_TITLE';
export const CREATE_TRIP_SAVE_DEST = 'CREATE_TRIP_SAVE_DEST';
export const CREATE_TRIP_SAVE_VISIBILITY = 'CREATE_TRIP_SAVE_VISIBILITY';
export const API_CREATE_TRIP_REQUEST = 'API_CREATE_TRIP_REQUEST';
export const API_CREATE_TRIP_SUCCESS = 'API_CREATE_TRIP_SUCCESS';
export const API_CREATE_TRIP_FAILURE = 'API_CREATE_TRIP_FAILURE';
export const API_GET_TRIPS_REQUEST = 'API_GET_TRIPS_REQUEST';
export const API_GET_TRIPS_SUCCESS = 'API_GET_TRIPS_SUCCESS';
export const API_GET_TRIPS_FAILURE = 'API_GET_TRIPS_FAILURE';
export const API_GET_TRIP_REQUEST = 'API_GET_TRIP_REQUEST';
export const API_GET_TRIP_SUCCESS = 'API_GET_TRIP_SUCCESS';
export const API_GET_TRIP_FAILURE = 'API_GET_TRIP_FAILURE';
export const CLEAR_CURRENT_TRIP = 'CLEAR_CURRENT_TRIP';
export const CLEAR_TRIPS_ERROR = 'CLEAR_TRIPS_ERROR';

/*
 * Action Creators
 */

// Authentication
export function loginSaveEmail(email) {
  return {
    type: LOGIN_SAVE_EMAIL,
    email
  };
}

export function loginSavePassword(password) {
  return {
    type: LOGIN_SAVE_PASSWORD,
    password
  };
}

export function signupSaveName(name) {
  return {
    type: SIGNUP_SAVE_NAME,
    name
  };
}

export function signupSaveEmail(email) {
  return {
    type: SIGNUP_SAVE_EMAIL,
    email
  };
}

export function signupSavePassword(password) {
  return {
    type: SIGNUP_SAVE_PASSWORD,
    password
  };
}

export function apiLoginRequest() {
  return {
    type: API_LOGIN_REQUEST
  };
}

export function apiLoginSuccess(json) {
  return {
    type: API_LOGIN_SUCCESS,
    user: json.user,
    token: json.token
  };
}

export function apiLoginFailure(error) {
  return {
    type: API_LOGIN_FAILURE,
    error
  };
}

export function apiSignupRequest() {
  return {
    type: API_SIGNUP_REQUEST
  };
}

export function apiSignupSuccess(json) {
  return {
    type: API_SIGNUP_SUCCESS,
    user: json.user,
    token: json.token
  };
}

export function apiSignupFailure(error) {
  return {
    type: API_SIGNUP_FAILURE,
    error
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

// Trip Management
export function createTripSaveTitle(title) {
  return {
    type: CREATE_TRIP_SAVE_TITLE,
    title
  };
}

export function createTripSaveDest(destination) {
  return {
    type: CREATE_TRIP_SAVE_DEST,
    destination
  };
}

export function createTripSaveVisibility(visibility) {
  return {
    type: CREATE_TRIP_SAVE_VISIBILITY,
    visibility
  };
}

export function clearCurrentTrip() {
  return {
    type: CLEAR_CURRENT_TRIP
  };
}

export function clearTripsError() {
  return {
    type: CLEAR_TRIPS_ERROR
  };
}

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

export function apiCreateTripRequest() {
  return {
    type: API_CREATE_TRIP_REQUEST
  };
}

export function apiCreateTripSuccess(json) {
  return {
    type: API_CREATE_TRIP_SUCCESS,
    trip: json.trip
  };
}

export function apiCreateTripFailure(error) {
  return {
    type: API_CREATE_TRIP_FAILURE,
    error
  };
}


/*
 * Action Creator thunks
 */

// Authentication
let optsTemplate = {
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

let handleErrors = (response) => {
  if (response.ok) {
    return response;
  } else {
    return response.json().then(json => Promise.reject(json));
  }
};

export function apiLogin() {
  return (dispatch, getState) => {
    dispatch(apiLoginRequest());

    let { email, password } = getState().authState;
    let opts = {...optsTemplate};
    opts.method = journeyAPI.login().method;
    opts.body = JSON.stringify({ email, password });

    fetch(journeyAPI.login().route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiLoginSuccess(json));
        dispatch(apiGetTrips());
        viewTripsPage();
      })
      .catch(error => { dispatch(apiLoginFailure(error.message)) });
  };
}

export function apiSignup() {
  return (dispatch, getState) => {
    dispatch(apiSignupRequest());

    let { newName, newEmail, newPassword } = getState().authState;
    let opts = {...optsTemplate};
    opts.method = journeyAPI.signup().method;
    opts.body = JSON.stringify({
      name: newName,
      email: newEmail,
      password: newPassword
    });

    fetch(journeyAPI.signup().route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiSignupSuccess(json));
        dispatch(apiGetTrips());
        viewTripsPage();
      })
      .catch(error => { dispatch(apiSignupFailure(error.message)); });
  };
}

// Trip Management
export function apiGetTrips() {
  return (dispatch, getState) => {
    dispatch(apiGetTripsRequest());

    const { user } = getState().authState;
    const userTrips = journeyAPI.trips.get(user._id);
    let opts = {
      ...optsTemplate,
      method: userTrips.method
    };
    opts.headers['Authorization'] = getState().authState.token;

    fetch(userTrips.route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiGetTripsSuccess(json));
      })
      .catch(error => { dispatch(apiGetTripsFailure(error.message)); });
  };
}

export function apiGetTrip(tripId) {
  return (dispatch, getState) => {
    dispatch(apiGetTripRequest());

    const userTrip = journeyAPI.trip.get(tripId);
    let opts = {
      ...optsTemplate,
      method: userTrip.method
    };

    // Only add Authorization header if a user has authenticated
    if (getState().authState.token) {
      opts.headers['Authorization'] = getState().authState.token;
    }

    fetch(userTrip.route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiGetTripSuccess(json));
      })
      .catch(error => { dispatch(apiGetTripFailure(error.message)); });
  };
}

export function apiCreateTrip() {
  return (dispatch, getState) => {
    dispatch(apiCreateTripRequest());

    // Format the destination object before saving
    const title = getState().tripsState.newTitle;
    const dest = getState().tripsState.newDestination;
    const visibility = getState().tripsState.newVisibility || 'public';
    const loc = dest.geometry.location;

    let destParams = {
      googlePlaceId: dest.place_id,
      name: dest.name,
      formattedAddress: dest.formatted_address,
      loc: {
        type: 'Point',
        coordinates: [loc.lng(), loc.lat()]
      },
      types: dest.types
    };

    const createTrip = journeyAPI.trips.create();
    let opts = {
      ...optsTemplate,
      method: createTrip.method,
      body: JSON.stringify({
        title,
        visibility,
        destination: destParams
      })
    };
    opts.headers['Authorization'] = getState().authState.token;

    fetch(createTrip.route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiCreateTripSuccess(json));
        dispatch(apiGetTrips());
        viewTripPage(json.trip._id);
      })
      .catch(error => { dispatch(apiCreateTripFailure(error.message)); });
  };
}

'use strict';

import { combineReducers } from 'redux';
import _ from 'underscore';
import {
  LOGIN_SAVE_EMAIL,
  LOGIN_SAVE_PASSWORD,
  SIGNUP_SAVE_NAME,
  SIGNUP_SAVE_EMAIL,
  SIGNUP_SAVE_PASSWORD,
  API_LOGIN_REQUEST,
  API_LOGIN_SUCCESS,
  API_LOGIN_FAILURE,
  API_SIGNUP_REQUEST,
  API_SIGNUP_SUCCESS,
  API_SIGNUP_FAILURE,
  CREATE_TRIP_SAVE_TITLE,
  CREATE_TRIP_SAVE_DEST,
  CREATE_TRIP_SAVE_VISIBILITY,
  CLEAR_TRIPS_ERROR,
  API_GET_TRIPS_REQUEST,
  API_GET_TRIPS_SUCCESS,
  API_GET_TRIPS_FAILURE,
  API_GET_TRIP_REQUEST,
  API_GET_TRIP_SUCCESS,
  API_GET_TRIP_FAILURE,
  API_CREATE_TRIP_REQUEST,
  API_CREATE_TRIP_SUCCESS,
  API_CREATE_TRIP_FAILURE,
  LOGOUT
} from './actions/actions';
import { initialAuthState, initialTripsState } from './constants';

function authState(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_SAVE_EMAIL:
      return { ...state, email: action.email };
    case LOGIN_SAVE_PASSWORD:
      return { ...state, password: action.password };
    case SIGNUP_SAVE_NAME:
      return { ...state, newName: action.name };
    case SIGNUP_SAVE_EMAIL:
      return { ...state, newEmail: action.email };
    case SIGNUP_SAVE_PASSWORD:
      return { ...state, newPassword: action.password };
    case API_LOGIN_REQUEST:
    case API_SIGNUP_REQUEST:
      const newState = _.omit(state, 'error');
      return {
        ...newState,
        isFetching: true
      };
    case API_LOGIN_SUCCESS:
      const newState = _.omit(state, ['error', 'email', 'password']);
      return {
        ...newState,
        isFetching: false,
        user: action.user,
        token: action.token
      };
    case API_SIGNUP_SUCCESS:
      const newState = _.omit(state, [
        'error',
        'newName',
        'newEmail',
        'newPassword'
      ]);
      return {
        ...newState,
        isFetching: false,
        user: action.user,
        token: action.token
      };
    case API_LOGIN_FAILURE:
    case API_SIGNUP_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case LOGOUT:
      return initialAuthState;
  }

  return state;
}

function tripsState(state = initialTripsState, action) {
  switch (action.type) {
    case CREATE_TRIP_SAVE_TITLE:
      return {
        ...state,
        newTitle: action.title
      };
    case CREATE_TRIP_SAVE_DEST:
      return {
        ...state,
        newDestination: action.destination
      };
    case CREATE_TRIP_SAVE_VISIBILITY:
      return {
        ...state,
        newVisibility: action.visibility
      };
    case API_GET_TRIPS_REQUEST:
    case API_GET_TRIP_REQUEST:
    case API_CREATE_TRIP_REQUEST:
      const newState = _.omit(state, ['error', 'trip']);
      return {
        ...newState,
        isFetching: true
      };
    case API_GET_TRIPS_SUCCESS:
      const newState = _.omit(state, ['error']);
      return {
        ...newState,
        isFetching: false,
        trips: action.trips
      };
    case API_CREATE_TRIP_SUCCESS:
      const newState = _.omit(state, [
        'error',
        'newTitle',
        'newDestination',
        'newVisibility'
      ]);
      return {
        ...newState,
        trips: [action.trip].concat(state.trips),
        isFetching: false
      };
    case API_GET_TRIP_SUCCESS:
      return {
        ...state,
        trip: action.trip,
        isFetching: false
      };
    case API_GET_TRIPS_FAILURE:
    case API_CREATE_TRIP_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case API_GET_TRIP_FAILURE:
      return {
        ...state,
        isFetching: false,
        tripError: action.error
      };
    case CLEAR_TRIPS_ERROR:
      return _.omit(state, ['error', 'tripError']);
    case LOGOUT:
      return initialTripsState;
  }

  return state;
}

const appReducers = combineReducers({
  authState,
  tripsState
});

export default appReducers;

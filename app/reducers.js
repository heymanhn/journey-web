'use strict';

import { combineReducers } from 'redux';
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
  API_GET_TRIPS_REQUEST,
  API_GET_TRIPS_SUCCESS,
  API_GET_TRIPS_FAILURE,
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
      delete state.error;
      return {
        ...state,
        isFetching: true
      };
    case API_LOGIN_SUCCESS:
      delete state.error;
      delete state.email;
      delete state.password;
      return {
        ...state,
        isFetching: false,
        user: action.user,
        token: action.token
      };
    case API_SIGNUP_SUCCESS:
      delete state.error;
      delete state.newName;
      delete state.newEmail;
      delete state.newPassword;
      return {
        ...state,
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
    case API_GET_TRIPS_REQUEST:
      delete state.error;
      return {
        ...state,
        isFetching: true
      };
    case API_GET_TRIPS_SUCCESS:
      delete state.error;
      return {
        ...state,
        isFetching: false,
        trips: action.trips
      };
    case API_GET_TRIPS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
  }

  return state;
}

const appReducers = combineReducers({
  authState,
  tripsState
});

export default appReducers;

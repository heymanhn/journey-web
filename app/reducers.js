'use strict';

import { routerReducer as routing } from 'react-router-redux';
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
  LOGOUT
} from './actions';
import { initialAuthState } from './constants';

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
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
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

const appReducers = combineReducers({
  authState,
  routing
});

export default appReducers;

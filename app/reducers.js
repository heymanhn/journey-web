'use strict';

import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import {
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
      delete state.password;
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case API_SIGNUP_FAILURE:
      delete state.newPassword;
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

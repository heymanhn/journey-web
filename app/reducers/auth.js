'use strict';
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
  CREATE_ANONYMOUS_ID,
  LOGOUT
} from '../actions/auth';
import { initialAuthState } from '../constants';

export default function authState(state = initialAuthState, action) {
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
      return {
        ...(_.omit(state, 'error')),
        isFetching: true
      };
    case API_LOGIN_SUCCESS:
      return {
        ...(_.omit(state, ['error', 'email', 'password'])),
        isFetching: false,
        user: action.user,
        token: action.token
      };
    case API_SIGNUP_SUCCESS:
      return {
        ...(_.omit(state, [
          'error',
          'newName',
          'newEmail',
          'newPassword'
        ])),
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
    case CREATE_ANONYMOUS_ID:
      return {
        ...state,
        anonymousId: action.anonymousId
      };
    case LOGOUT:
      return initialAuthState;
  }

  return state;
}

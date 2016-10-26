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
  CLEAR_AUTH_STATE,
  LOGOUT
} from 'app/actions/auth';
import { initialAuthState } from 'app/constants';

export default function authState(state = initialAuthState, action) {
  switch (action.type) {
    case LOGIN_SAVE_EMAIL:
      return {
        ...state,
        loginFields: _.extend(state.loginFields, { email: action.email })
      };
    case LOGIN_SAVE_PASSWORD:
      return {
        ...state,
        loginFields: _.extend(
          state.loginFields,
          { password: action.password }
        )
      };
    case SIGNUP_SAVE_NAME:
      return {
        ..._.omit(state, 'error'),
        signupFields: _.extend(state.signupFields, { name: action.name })
      };
    case SIGNUP_SAVE_EMAIL:
      return {
        ..._.omit(state, 'error'),
        signupFields: _.extend(state.signupFields, { email: action.email })
      };
    case SIGNUP_SAVE_PASSWORD:
      return {
        ..._.omit(state, 'error'),
        signupFields: _.extend(
          state.signupFields,
          { password: action.password }
        )
      };
    case API_LOGIN_REQUEST:
    case API_SIGNUP_REQUEST:
      return {
        ..._.omit(state, 'error'),
        isFetching: true
      };
    case API_LOGIN_SUCCESS:
      return {
        ..._.omit(state, 'error'),
        isFetching: false,
        loginFields: {},
        user: action.user,
        token: action.token
      };
    case API_SIGNUP_SUCCESS:
      return {
        ..._.omit(state, 'error'),
        isFetching: false,
        loginFields: {},
        signupFields: {},
        token: action.token,
        user: action.user
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
    case CLEAR_AUTH_STATE:
      return {
        ..._.omit(state, 'error'),
        loginFields: {},
        signupFields: {}
      };
    case LOGOUT:
      return initialAuthState;
  }

  return state;
}

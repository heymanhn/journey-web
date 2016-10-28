'use strict';
import _ from 'underscore';
import {
  LOGIN_SAVE_EMAIL,
  LOGIN_SAVE_PASSWORD,
  SET_REDIRECT,
  CLEAR_REDIRECT,
  SIGNUP_SAVE_NAME,
  SIGNUP_SAVE_EMAIL,
  SIGNUP_SAVE_PASSWORD,
  UPDATE_USER_SAVE_EMAIL,
  UPDATE_USER_SAVE_NAME,
  UPDATE_USER_SAVE_PASSWORD,
  API_LOGIN_REQUEST,
  API_LOGIN_SUCCESS,
  API_LOGIN_FAILURE,
  API_SIGNUP_REQUEST,
  API_SIGNUP_SUCCESS,
  API_SIGNUP_FAILURE,
  API_UPDATE_USER_REQUEST,
  API_UPDATE_USER_SUCCESS,
  API_UPDATE_USER_FAILURE,
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
    case SET_REDIRECT:
      return {
        ...state,
        redirect: action.redirect
      };
    case CLEAR_REDIRECT:
      return _.omit(state, 'redirect');
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
    case UPDATE_USER_SAVE_EMAIL:
      return {
        ...state,
        newUserFields: _.extend(state.newUserFields, { email: action.email })
      };
    case UPDATE_USER_SAVE_NAME:
      return {
        ...state,
        newUserFields: _.extend(state.newUserFields, { name: action.name })
      };
    case UPDATE_USER_SAVE_PASSWORD:
      return {
        ...state,
        newUserFields: _.extend(
          state.newUserFields,
          { password: action.password }
        )
      };
    case API_LOGIN_REQUEST:
    case API_SIGNUP_REQUEST:
    case API_UPDATE_USER_REQUEST:
      return {
        ..._.omit(state, 'error'),
        isFetching: true
      };
    case API_LOGIN_SUCCESS:
    case API_SIGNUP_SUCCESS:
    case API_UPDATE_USER_SUCCESS:
      return {
        ..._.omit(state, 'error'),
        isFetching: false,
        loginFields: {},
        newUserFields: {},
        signupFields: {},
        token: action.token,
        user: action.user
      };
    case API_LOGIN_FAILURE:
    case API_SIGNUP_FAILURE:
    case API_UPDATE_USER_FAILURE:
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
        isFetching: false,
        loginFields: {},
        newUserFields: {},
        signupFields: {}
      };
    case LOGOUT:
      return initialAuthState;
  }

  return state;
}

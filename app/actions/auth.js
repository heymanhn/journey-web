'use strict';

import fetch from 'isomorphic-fetch';
import { apiIdentifyGuest, apiTrackEvent } from './analytics';
import { viewLandingPage, viewTripsPage } from './navigation'
import {
  analytics,
  fetchOptsTemplate,
  handleErrors,
  journeyAPI
} from 'app/constants';

/*
 * Action Types
 */

export const LOGIN_SAVE_EMAIL = 'LOGIN_SAVE_EMAIL';
export const LOGIN_SAVE_PASSWORD = 'LOGIN_SAVE_PASSWORD';
export const SIGNUP_SAVE_NAME = 'SIGNUP_SAVE_NAME';
export const SIGNUP_SAVE_EMAIL = 'SIGNUP_SAVE_EMAIL';
export const SIGNUP_SAVE_PASSWORD = 'SIGNUP_SAVE_PASSWORD';
export const SET_REDIRECT = 'SET_REDIRECT';
export const CLEAR_REDIRECT = 'CLEAR_REDIRECT';
export const API_LOGIN_REQUEST = 'API_LOGIN_REQUEST';
export const API_LOGIN_SUCCESS = 'API_LOGIN_SUCCESS';
export const API_LOGIN_FAILURE = 'API_LOGIN_FAILURE';
export const API_SIGNUP_REQUEST = 'API_SIGNUP_REQUEST';
export const API_SIGNUP_SUCCESS = 'API_SIGNUP_SUCCESS';
export const API_SIGNUP_FAILURE = 'API_SIGNUP_FAILURE';
export const CREATE_ANONYMOUS_ID = 'CREATE_ANONYMOUS_ID';
export const CLEAR_AUTH_STATE = 'CLEAR_AUTH_STATE';
export const LOGOUT = 'LOGOUT';


/*
 * Action Creators
 */

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

export function setRedirect(redirect) {
  return {
    type: SET_REDIRECT,
    redirect
  };
}

export function clearRedirect() {
  return {
    type: CLEAR_REDIRECT
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

export function createAnonymousId(anonymousId) {
  return {
    type: CREATE_ANONYMOUS_ID,
    anonymousId
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}


/*
 * Action Creator thunks
 */

export function apiLogin() {
  return (dispatch, getState) => {
    dispatch(apiLoginRequest());

    const { authState } = getState();
    const { loginFields, redirect } = authState;
    let { email, password } = loginFields;
    let opts = {...fetchOptsTemplate(authState)};
    opts.method = journeyAPI.login().method;
    opts.body = JSON.stringify({ email, password });

    return fetch(journeyAPI.login().route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiLoginSuccess(json));

        if (redirect) {
          dispatch(redirect());
          dispatch(clearRedirect());
        } else {
          dispatch(viewTripsPage());
        }
      })
      .catch(error => { dispatch(apiLoginFailure(error.message)) });
  };
}

export function apiSignup() {
  return (dispatch, getState) => {
    dispatch(apiSignupRequest());

    const { authState } = getState();
    const { redirect, signupFields } = authState;
    let { name, email, password } = signupFields;
    let opts = {...fetchOptsTemplate(authState)};
    opts.method = journeyAPI.signup().method;
    opts.body = JSON.stringify({ email, name, password });

    return fetch(journeyAPI.signup().route, opts)
      .then(handleErrors)
      .then(response => response.json())
      .then(json => {
        dispatch(apiSignupSuccess(json));
        if (redirect) {
          dispatch(redirect());
          dispatch(clearRedirect());
        } else {
          dispatch(viewTripsPage());
        }
      })
      .catch(error => { dispatch(apiSignupFailure(error.message)); });
  };
}

export function processLogout() {
  return (dispatch) => {
    dispatch(apiTrackEvent(analytics.events.LOG_OUT));
    dispatch(logout());
    viewLandingPage();
    dispatch(apiIdentifyGuest());
  };
}

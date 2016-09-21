'use strict';

import fetch from 'isomorphic-fetch';
import { viewTripsPage } from './navigation'
import { fetchOptsTemplate, handleErrors, journeyAPI } from '../constants';
import { apiGetTrips } from './trips';

/*
 * Action Types
 */

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


/*
 * Action Creator thunks
 */

export function apiLogin() {
  return (dispatch, getState) => {
    dispatch(apiLoginRequest());

    let { email, password } = getState().authState;
    let opts = {...fetchOptsTemplate};
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
    let opts = {...fetchOptsTemplate};
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

'use strict';

/*
 * Action Types
 */

export const SET_PAGE_LOGIN_STATE = 'SET_PAGE_LOGIN_STATE';
export const SET_PAGE_SIGNUP_STATE = 'SET_PAGE_SIGNUP_STATE';
export const SET_OVERRIDE_FRAME = 'SET_OVERRIDE_FRAME';
export const CLEAR_OVERRIDE_FRAME = 'CLEAR_OVERRIDE_FRAME';


/*
 * Action Creators
 */

export function setPageLoginState() {
  return {
    type: SET_PAGE_LOGIN_STATE
  };
}

export function setPageSignupState() {
  return {
    type: SET_PAGE_SIGNUP_STATE
  };
}

export function setOverrideFrame(frame) {
  return {
    type: SET_OVERRIDE_FRAME,
    frame
  };
}

export function clearOverrideFrame() {
  return {
    type: CLEAR_OVERRIDE_FRAME
  };
}

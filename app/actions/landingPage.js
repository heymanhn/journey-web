'use strict';

/*
 * Action Types
 */

export const SET_PAGE_LOGIN_STATE = 'SET_PAGE_LOGIN_STATE';
export const RESET_PAGE_STATE = 'RESET_PAGE_STATE';


/*
 * Action Creators
 */

export function setPageLoginState() {
  return {
    type: SET_PAGE_LOGIN_STATE
  };
}

export function resetPageState() {
  return {
    type: RESET_PAGE_STATE
  };
}

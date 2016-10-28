'use strict';

/*
 * Action Types
 */

export const CLEAR_SUCCESS_STATE = 'CLEAR_SUCCESS_STATE';


/*
 * Action Creators
 */

export function clearSuccessState() {
  return {
    type: CLEAR_SUCCESS_STATE
  };
}

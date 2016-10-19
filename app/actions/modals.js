'use strict';

import _ from 'underscore';


/*
 * Action Types
 */

export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';


/*
 * Action Creators
 */

export function showModal(modalId) {
  return {
    type: SHOW_MODAL,
    modalId
  };
}

export function hideModal(modalId) {
  return {
    type: HIDE_MODAL,
    modalId
  };
}

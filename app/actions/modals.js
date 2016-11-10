'use strict';

import _ from 'underscore';
import { resetAutocomplete } from './autocomplete';
import { acComponents, modalComponents } from 'app/constants';

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

function hideModalAction(modalId) {
  return {
    type: HIDE_MODAL,
    modalId
  };
}

export function hideModal(modalId) {
  return dispatch => {
    let autocompleteId;
    if (modalId === modalComponents.tripSettings) {
      autocompleteId = acComponents.tripAC;
    }

    dispatch(hideModalAction(modalId));
    autocompleteId && dispatch(resetAutocomplete(autocompleteId));
  };
}

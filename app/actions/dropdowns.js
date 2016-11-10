'use strict';

import { resetAutocomplete } from './autocomplete';
import { clearFocusLngLat } from 'app/actions/trips';
import { acComponents, dropdownComponents } from 'app/constants';

/*
 * Action Types
 */

export const SHOW_DROPDOWN = 'SHOW_DROPDOWN';
export const HIDE_DROPDOWN = 'HIDE_DROPDOWN';


/*
 * Action Creators
 */

function showDropdown(dropdownId) {
  return {
    type: SHOW_DROPDOWN,
    dropdownId
  };
}

function hideDropdown(dropdownId) {
  return {
    type: HIDE_DROPDOWN,
    dropdownId
  };
}

export function toggleDropdown(dropdownId) {
  return (dispatch, getState) => {
    const {
      showDropdown: isShown
    } = getState().componentsState.dropdownsState[dropdownId];

    if (isShown) {
      let autocompleteId;
      if (dropdownId === dropdownComponents.addTripIdeas) {
        autocompleteId = acComponents.tripIdeaAC;
        dispatch(clearFocusLngLat());
      }

      dispatch(hideDropdown(dropdownId));
      autocompleteId && dispatch(resetAutocomplete(autocompleteId));
    } else {
      dispatch(showDropdown(dropdownId));
    }
  };
}

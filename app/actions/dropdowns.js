'use strict';

import { clearSavedPlace, resetAutocomplete } from './autocomplete';
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
    const { dropdownsState } = getState().componentsState;
    const { showDropdown: isShown } = dropdownsState[dropdownId];

    if (isShown) {
      let autocompleteId;
      if (dropdownId === dropdownComponents.addTripIdeas) {
        autocompleteId = acComponents.tripIdeaAC;
      }

      dispatch(hideDropdown(dropdownId));
      if (autocompleteId) {
        dispatch(resetAutocomplete(autocompleteId));
        dispatch(clearSavedPlace(autocompleteId));
      }
    } else {
      // Hide the other dropdowns before showing this one
      for (const id in dropdownsState) {
        id !== dropdownId && dispatch(hideDropdown(id));
      }

      dispatch(showDropdown(dropdownId));
    }
  };
}

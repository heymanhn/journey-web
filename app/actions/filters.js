'use strict';

/*
 * Action Types
 */

export const ADD_CATEGORY = 'ADD_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
export const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES';


/*
 * Action Creators
 */

function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category
  };
}

function removeCategory(category) {
  return {
    type: REMOVE_CATEGORY,
    category
  };
}

export function toggleCategory(category) {
  return (dispatch, getState) => {
    const { categories } = getState().componentsState.filtersState;

    return categories.includes(category) ?
      dispatch(removeCategory(category)) :
      dispatch(addCategory(category));
  };
}

export function clearCategories() {
  return {
    type: CLEAR_CATEGORIES
  };
}

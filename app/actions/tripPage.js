'use strict';

/*
 * Action Types
 */

export const UPDATE_PAGE_HEIGHT = 'UPDATE_PAGE_HEIGHT';


/*
 * Action Creators
 */

export function updatePageHeight(height) {
  return {
    type: UPDATE_PAGE_HEIGHT,
    height
  };
}

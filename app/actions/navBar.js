'use strict';

/*
 * Action Types
 */

export const SET_GRAVATAR_ACTIVE = 'SET_GRAVATAR_ACTIVE';
export const SET_GRAVATAR_INACTIVE = 'SET_GRAVATAR_INACTIVE';
export const SET_TOOLTIP_VISIBLE = 'SET_TOOLTIP_VISIBLE';
export const SET_TOOLTIP_INVISIBLE = 'SET_TOOLTIP_INVISIBLE';


/*
 * Action Creators
 */

export function setGravatarActive() {
  return {
    type: SET_GRAVATAR_ACTIVE
  };
}

export function setGravatarInactive() {
  return {
    type: SET_GRAVATAR_INACTIVE
  };
}

export function setTooltipVisible() {
  return {
    type: SET_TOOLTIP_VISIBLE
  };
}

export function setTooltipInvisible() {
  return {
    type: SET_TOOLTIP_INVISIBLE
  };
}

'use strict';

import _ from 'underscore';
import {
  SET_GRAVATAR_ACTIVE,
  SET_GRAVATAR_INACTIVE,
  SET_TOOLTIP_VISIBLE,
  SET_TOOLTIP_INVISIBLE,
  LOGOUT
} from 'app/actions/navBar';
import { initialNavBarState } from 'app/constants';

export default function navBarState(state = initialNavBarState, action) {
  switch (action.type) {
    case SET_GRAVATAR_ACTIVE:
      return { ...state, gravatarFocused: true };
    case SET_GRAVATAR_INACTIVE:
      return { ...state, gravatarFocused: false };
    case SET_TOOLTIP_VISIBLE:
      return { ...state, tooltipVisible: true };
    case SET_TOOLTIP_INVISIBLE:
      return { ...state, tooltipVisible: false };
    case LOGOUT:
      return initialNavBarState;
  }

  return state;
}

'use strict';

import { LOGOUT } from 'app/actions/auth';
import {
  SET_PAGE_LOGIN_STATE,
  SET_PAGE_SIGNUP_STATE,
  SET_OVERRIDE_FRAME,
  CLEAR_OVERRIDE_FRAME
} from 'app/actions/landingPage';
import { initialLPState } from 'app/constants';

export default function landingPageState(state = initialLPState, action) {
  switch (action.type) {
    case SET_PAGE_LOGIN_STATE:
      return { ...state, frame: 'login' };
    case SET_PAGE_SIGNUP_STATE:
      return { ...state, frame: 'signup' };
    case SET_OVERRIDE_FRAME:
      return { ...state, overrideFrame: action.frame };
    case CLEAR_OVERRIDE_FRAME:
    case LOGOUT:
      return initialLPState;
  }

  return state;
}

'use strict';

import {
  SET_PAGE_LOGIN_STATE,
  RESET_PAGE_STATE
} from 'app/actions/landingPage';
import { initialLPState } from 'app/constants';

export default function landingPageState(state = initialLPState, action) {
  switch (action.type) {
    case SET_PAGE_LOGIN_STATE:
      return { ...state, frame: 'login' };
    case RESET_PAGE_STATE:
      return initialLPState;
  }

  return state;
}

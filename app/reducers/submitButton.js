'use strict';

import _ from 'underscore';
import { API_UPDATE_USER_SUCCESS } from 'app/actions/auth';
import { CLEAR_SUCCESS_STATE } from 'app/actions/submitButton';

export default function navBarState(state = {}, action) {
  switch (action.type) {
    case API_UPDATE_USER_SUCCESS:
      return { ...state, success: true };
    case CLEAR_SUCCESS_STATE:
      return _.omit(state, 'success');
  }

  return state;
}

'use strict';

import _ from 'underscore';
import {
  UPDATE_PAGE_HEIGHT
} from 'app/actions/tripPage';
import { initialTripPageState } from 'app/constants';

export default function tripPageState(state = initialTripPageState, action) {
  switch (action.type) {
    case UPDATE_PAGE_HEIGHT:
      return { ...state, pageHeight: action.height };
  }

  return state;
}

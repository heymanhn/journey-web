'use strict';

import _ from 'underscore';
import {
  API_GET_TRIP_REQUEST,
  API_GET_TRIP_SUCCESS,
  API_GET_TRIP_FAILURE,
  CLEAR_TRIP_ERROR,
  LOGOUT
} from '../actions/actions';
import { initialTripState } from '../constants';

export default function tripState(state = initialTripState, action) {
  switch (action.type) {
    case API_GET_TRIP_REQUEST:
      return {
        ...(_.omit(state, ['error', 'trip'])),
        isFetching: true
      };
    case API_GET_TRIP_SUCCESS:
      return {
        ...state,
        trip: action.trip,
        isFetching: false
      };
    case API_GET_TRIP_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case CLEAR_TRIP_ERROR:
      return _.omit(state, ['error']);
    case LOGOUT:
      return initialTripState;
  }

  return state;
}

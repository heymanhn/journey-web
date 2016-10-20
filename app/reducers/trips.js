'use strict';

import _ from 'underscore';
import {
  CLEAR_TRIPS_ERROR,
  API_GET_TRIPS_REQUEST,
  API_GET_TRIPS_SUCCESS,
  API_GET_TRIPS_FAILURE,
  DELETE_TRIP,
  API_DELETE_TRIP_REQUEST,
  API_DELETE_TRIP_SUCCESS,
  API_DELETE_TRIP_FAILURE
} from 'app/actions/trips';
import { LOGOUT } from 'app/actions/auth';
import { initialTripsState } from 'app/constants';

export default function tripsState(state = initialTripsState, action) {
  switch (action.type) {
    case API_GET_TRIPS_REQUEST:
    case API_DELETE_TRIP_REQUEST:
      return {
        ...(_.omit(state, ['error'])),
        isFetching: true
      };
    case API_GET_TRIPS_SUCCESS:
      return {
        ...(_.omit(state, ['error'])),
        isFetching: false,
        trips: action.trips
      };
    case API_DELETE_TRIP_SUCCESS:
      return {
        ...(_.omit(state, ['error'])),
        isFetching: false
      };
    case DELETE_TRIP:
      return {
        ...state,
        isFetching: false,
        trips: _.reject(state.trips, (trip) => trip._id === action.tripId)
      };
    case API_GET_TRIPS_FAILURE:
    case API_DELETE_TRIP_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case CLEAR_TRIPS_ERROR:
      return _.omit(state, ['error']);
    case LOGOUT:
      return initialTripsState;
  }

  return state;
}

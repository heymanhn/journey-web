'use strict';

import _ from 'underscore';
import {
  CREATE_TRIP_SAVE_TITLE,
  CREATE_TRIP_SAVE_DEST,
  CREATE_TRIP_SAVE_VISIBILITY,
  CLEAR_TRIPS_ERROR,
  API_GET_TRIPS_REQUEST,
  API_GET_TRIPS_SUCCESS,
  API_GET_TRIPS_FAILURE,
  API_CREATE_TRIP_REQUEST,
  API_CREATE_TRIP_SUCCESS,
  API_CREATE_TRIP_FAILURE
} from '../actions/trips';
import { LOGOUT } from '../actions/auth';
import { initialTripsState } from '../constants';

export default function tripsState(state = initialTripsState, action) {
  switch (action.type) {
    case CREATE_TRIP_SAVE_TITLE:
      return {
        ...state,
        newTitle: action.title
      };
    case CREATE_TRIP_SAVE_DEST:
      return {
        ...state,
        newDestination: action.destination
      };
    case CREATE_TRIP_SAVE_VISIBILITY:
      return {
        ...state,
        newVisibility: action.visibility
      };
    case API_GET_TRIPS_REQUEST:
    case API_CREATE_TRIP_REQUEST:
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
    case API_CREATE_TRIP_SUCCESS:
      return {
        ...(_.omit(state, [
          'error',
          'newTitle',
          'newDestination',
          'newVisibility'
        ])),
        trips: [action.trip].concat(state.trips),
        isFetching: false
      };
    case API_GET_TRIPS_FAILURE:
    case API_CREATE_TRIP_FAILURE:
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

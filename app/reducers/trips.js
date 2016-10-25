'use strict';

import _ from 'underscore';
import {
  CLEAR_TRIPS_ERROR,
  HOVER_OVER_TRIP,
  CLEAR_HOVER_OVER_TRIP,
  API_GET_TRIPS_REQUEST,
  API_GET_TRIPS_SUCCESS,
  API_GET_TRIPS_FAILURE,
  SET_TRIP_TO_DELETE,
  API_DELETE_TRIP_REQUEST,
  API_DELETE_TRIP_SUCCESS,
  API_DELETE_TRIP_FAILURE
} from 'app/actions/trips';
import { LOGOUT } from 'app/actions/auth';
import { HIDE_MODAL } from 'app/actions/modals';
import { initialTripsState, modalComponents } from 'app/constants';

export default function tripsState(state = initialTripsState, action) {
  switch (action.type) {
    case HOVER_OVER_TRIP:
      return {
        ...state,
        hoverTripId: action.tripId
      };
    case CLEAR_HOVER_OVER_TRIP:
      return _.omit(state, 'hoverTripId');
    case API_GET_TRIPS_REQUEST:
    case API_DELETE_TRIP_REQUEST:
      return {
        ..._.omit(state, ['error']),
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
        ..._.omit(state, ['error', 'tripToDelete']),
        isFetching: false,
        trips: _.reject(state.trips, (trip) => trip._id === state.tripToDelete)
      };
    case SET_TRIP_TO_DELETE:
      return {
        ...state,
        tripToDelete: action.tripId
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
    case HIDE_MODAL:
      if (action.modalId === modalComponents.deleteTrip) {
        return _.omit(state, ['error', 'tripToDelete']);
      } else {
        return state;
      }
    case LOGOUT:
      return initialTripsState;
  }

  return state;
}

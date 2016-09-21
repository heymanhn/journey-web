'use strict';

import _ from 'underscore';
import { LOGOUT } from '../actions/auth';
import {
  API_GET_TRIP_REQUEST,
  API_GET_TRIP_SUCCESS,
  API_GET_TRIP_FAILURE,
  API_ADD_TRIP_IDEA_REQUEST,
  API_ADD_TRIP_IDEA_SUCCESS,
  API_ADD_TRIP_IDEA_FAILURE,
  SAVE_NEW_TRIP_IDEA,
  SAVE_IDEA_COMMENT,
  NEW_TRIP_IDEA_CLEARED,
  CLEAR_TRIP_ERROR
} from '../actions/trips';
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
    case API_ADD_TRIP_IDEA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case API_ADD_TRIP_IDEA_REQUEST:
      return {
        ...(_.omit(state, ['error'])),
        isFetching: true
      };
    case API_ADD_TRIP_IDEA_SUCCESS:
      const newTrip = _.clone(state.trip);
      newTrip.ideas = action.ideas;
      return {
        ...(_.omit(state, ['newIdea', 'newComment'])),
        trip: newTrip,
        resetIdeaBox: true,
        isFetching: false
      };
    case CLEAR_TRIP_ERROR:
      return _.omit(state, ['error']);
    case SAVE_NEW_TRIP_IDEA:
      return {
        ...state,
        newIdea: action.idea
      };
    case SAVE_IDEA_COMMENT:
      return {
        ...state,
        newComment: action.comment
      };
    case NEW_TRIP_IDEA_CLEARED:
      return {
        ...state,
        resetIdeaBox: false
      };
    case LOGOUT:
      return initialTripState;
  }

  return state;
}

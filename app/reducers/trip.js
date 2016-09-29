'use strict';

import _ from 'underscore';
import { LOGOUT } from '../actions/auth';
import {
  API_CREATE_TRIP_SUCCESS,
  API_GET_TRIP_REQUEST,
  API_GET_TRIP_SUCCESS,
  API_GET_TRIP_FAILURE,
  API_ADD_TRIP_IDEA_REQUEST,
  API_ADD_TRIP_IDEA_SUCCESS,
  API_ADD_TRIP_IDEA_FAILURE,
  API_UPDATE_TRIP_IDEA_REQUEST,
  API_UPDATE_TRIP_IDEA_SUCCESS,
  API_UPDATE_TRIP_IDEA_FAILURE,
  API_REMOVE_TRIP_IDEA_REQUEST,
  API_REMOVE_TRIP_IDEA_SUCCESS,
  API_REMOVE_TRIP_IDEA_FAILURE,
  SAVE_NEW_TRIP_IDEA,
  SAVE_IDEA_COMMENT,
  NEW_TRIP_IDEA_CLEARED,
  ADD_TRIP_IDEA,
  REMOVE_TRIP_IDEA,
  REORDER_TRIP_IDEA,
  SET_MOUSEOVER_IDEA,
  CLEAR_MOUSEOVER_IDEA,
  SET_FOCUSED_IDEA,
  CLEAR_FOCUSED_IDEA,
  CLEAR_TRIP_ERROR
} from '../actions/trips';
import { initialTripState } from '../constants';

export default function tripState(state = initialTripState, action) {
  switch (action.type) {
    case API_CREATE_TRIP_SUCCESS:
      return {
        ...state,
        trip: action.trip
      };
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
    case ADD_TRIP_IDEA:
      return {
        ...(_.omit(state, ['newIdea', 'newComment'])),
        trip: _.extend(state.trip, {
          ideas: [action.idea].concat(state.trip.ideas)
        }),
        resetIdeaBox: true,
        isFetching: false
      };
    case REORDER_TRIP_IDEA:
      let ideas = state.trip.ideas.slice();
      let idea1 = ideas[action.index1];
      ideas.splice(action.index1, 1);
      ideas.splice(action.index2, 0, idea1);
      return {
        ...state,
        trip: _.extend(state.trip, {
          ideas
        })
      };
    case REMOVE_TRIP_IDEA:
      return {
        ...state,
        trip: _.extend(state.trip, {
          ideas: _.reject(state.trip.ideas, (idea) =>
            idea._id === action.ideaId
          )
        })
      };
    case SET_MOUSEOVER_IDEA:
      return {
        ...state,
        mouseOverIdea: action.ideaId
      };
    case CLEAR_MOUSEOVER_IDEA:
      return _.omit(state, 'mouseOverIdea');
    case SET_FOCUSED_IDEA:
      return {
        ...state,
        focusedIdea: action.ideaId
      };
    case CLEAR_FOCUSED_IDEA:
      return _.omit(state, 'focusedIdea');
    case CLEAR_TRIP_ERROR:
      return _.omit(state, 'error');
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
    case API_ADD_TRIP_IDEA_SUCCESS:
    case API_UPDATE_TRIP_IDEA_SUCCESS:
    case API_REMOVE_TRIP_IDEA_SUCCESS:
      return {
        ...state,
        trip: _.extend(state.trip, { ideas: action.ideas }),
        isFetching: false
      };
    case API_GET_TRIP_FAILURE:
    case API_ADD_TRIP_IDEA_FAILURE:
    case API_UPDATE_TRIP_IDEA_FAILURE:
    case API_REMOVE_TRIP_IDEA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case API_ADD_TRIP_IDEA_REQUEST:
    case API_UPDATE_TRIP_IDEA_REQUEST:
    case API_REMOVE_TRIP_IDEA_REQUEST:
      return {
        ...(_.omit(state, 'error')),
        isFetching: true
      };
    case LOGOUT:
      return initialTripState;
  }

  return state;
}

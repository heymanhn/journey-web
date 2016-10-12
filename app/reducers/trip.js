'use strict';

import _ from 'underscore';
import { LOGOUT } from 'app/actions/auth';
import {
  API_CREATE_TRIP_SUCCESS,
  API_GET_TRIP_REQUEST,
  API_GET_TRIP_SUCCESS,
  API_GET_TRIP_FAILURE,
  API_UPDATE_TRIP_VIS_REQUEST,
  API_UPDATE_TRIP_REQUEST,
  API_UPDATE_TRIP_SUCCESS,
  API_UPDATE_TRIP_FAILURE,
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
  CLEAR_NEW_TRIP_IDEA,
  SAVE_IDEA_COMMENT,
  ADD_TRIP_IDEA,
  REMOVE_TRIP_IDEA,
  REORDER_TRIP_IDEA,
  SET_HOVER_LNGLAT,
  CLEAR_HOVER_LNGLAT,
  SET_FOCUS_LNGLAT,
  CLEAR_FOCUS_LNGLAT,
  CLEAR_TRIP_ERROR
} from 'app/actions/trips';
import { initialTripState } from 'app/constants';

export default function tripState(state = initialTripState, action) {
  switch (action.type) {
    case API_CREATE_TRIP_SUCCESS:
      return {
        ...state,
        trip: action.trip
      };
    case SAVE_NEW_TRIP_IDEA:
      return {
        ..._.omit(state, ['focusLngLat', 'hoverLngLat']),
        focusLngLat: action.idea.loc.coordinates,
        newIdea: action.idea
      };
    case CLEAR_NEW_TRIP_IDEA:
      return _.omit(state, ['focusLngLat', 'newIdea', 'newComment']);
    case SAVE_IDEA_COMMENT:
      return {
        ...state,
        newComment: action.comment
      };
    case ADD_TRIP_IDEA:
      return {
        ..._.omit(state, ['newIdea', 'newComment']),
        trip: _.extend(state.trip, {
          ideas: [action.idea].concat(state.trip.ideas)
        }),
        isFetching: false,
        focusLngLat: action.idea.loc.coordinates
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
        ..._.omit(state, ['focusLngLat', 'hoverLngLat']),
        trip: _.extend(state.trip, {
          ideas: _.reject(state.trip.ideas, (idea) =>
            idea._id === action.ideaId
          )
        })
      };
    case SET_HOVER_LNGLAT:
      return {
        ...state,
        hoverLngLat: action.lngLat
      };
    case CLEAR_HOVER_LNGLAT:
      return _.omit(state, 'hoverLngLat');
    case SET_FOCUS_LNGLAT:
      return {
        ...state,
        focusLngLat: action.lngLat
      };
    case CLEAR_FOCUS_LNGLAT:
      return _.omit(state, 'focusLngLat');
    case CLEAR_TRIP_ERROR:
      return _.omit(state, 'error');
    case API_GET_TRIP_REQUEST:
      return {
        ...(_.omit(state, ['error', 'trip'])),
        isFetching: true
      };
    case API_UPDATE_TRIP_VIS_REQUEST:
      return {
        ...state,
        isFetchingVisibility: true
      };
    case API_UPDATE_TRIP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetchingVisibility: false,
        trip: action.trip
      };
    case API_UPDATE_TRIP_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
        isFetchingVisibility: false
      };
    case API_GET_TRIP_SUCCESS:
      return {
        ...state,
        trip: action.trip,
        isFetching: false
      };
    case API_ADD_TRIP_IDEA_SUCCESS:
      return {
        ...state,
        trip: _.extend(state.trip, { ideas: action.ideas }),
        isFetching: false,
        focusLngLat: action.ideas[0].loc.coordinates
      };
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
    case API_UPDATE_TRIP_REQUEST:
      return {
        ...(_.omit(state, 'error')),
        isFetching: true
      };
    case LOGOUT:
      return initialTripState;
  }

  return state;
}

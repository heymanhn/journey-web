'use strict';

import _ from 'underscore';
import { LOGOUT } from 'app/actions/auth';
import { SHOW_MODAL, HIDE_MODAL } from 'app/actions/modals';
import {
  SAVE_NEW_TRIP_TITLE,
  SAVE_NEW_TRIP_DESTINATION,
  SAVE_NEW_TRIP_VISIBILITY,
  CLEAR_NEW_TRIP_TITLE,
  CLEAR_NEW_TRIP_DESTINATION,
  SAVE_NEW_TRIP_IDEA,
  CLEAR_NEW_TRIP_IDEA,
  SAVE_IDEA_CATEGORY,
  SAVE_IDEA_COMMENT,
  SET_IDEA_INDEX_TO_UPDATE,
  SET_TRIP_IDEA_TO_DELETE,
  REORDER_TRIP_IDEA,
  SAVE_IDEA_UPDATED_CATEGORY,
  SAVE_IDEA_UPDATED_COMMENT,
  SET_HOVER_LNGLAT,
  CLEAR_HOVER_LNGLAT,
  SET_FOCUS_LNGLAT,
  CLEAR_FOCUS_LNGLAT,
  SET_EDITING_IDEA,
  CLEAR_EDITING_IDEA,
  CLEAR_TRIP_ERROR,
  API_CREATE_TRIP_REQUEST,
  API_CREATE_TRIP_SUCCESS,
  API_CREATE_TRIP_FAILURE,
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
  API_DELETE_TRIP_IDEA_REQUEST,
  API_DELETE_TRIP_IDEA_SUCCESS,
  API_DELETE_TRIP_IDEA_FAILURE
} from 'app/actions/trips';
import { initialTripState, modalComponents } from 'app/constants';
const { deleteTripIdea, tripIdeaSettings, tripSettings } = modalComponents;

export default function tripState(state = initialTripState, action) {
  switch (action.type) {
    // UI actions
    case SAVE_NEW_TRIP_TITLE:
      return {
        ...state,
        newFields: _.extend(state.newFields, { title: action.title })
      };
    case CLEAR_NEW_TRIP_TITLE:
      return {
        ...state,
        newFields: _.omit(state.newFields, 'title')
      };
    case SAVE_NEW_TRIP_DESTINATION:
      return {
        ...state,
        newFields: _.extend(
          state.newFields,
          { destination: action.destination }
        )
      };
    case CLEAR_NEW_TRIP_DESTINATION:
      return {
        ...state,
        newFields: _.omit(state.newFields, 'destination')
      };
    case SAVE_NEW_TRIP_VISIBILITY:
      return {
        ...state,
        newFields: _.extend(
          state.newFields,
          { visibility: action.visibility }
        )
      };
    case SAVE_NEW_TRIP_IDEA:
      return {
        ..._.omit(state, ['focusLngLat', 'hoverLngLat']),
        focusLngLat: action.idea.loc.coordinates,
        newIdea: action.idea
      };
    case CLEAR_NEW_TRIP_IDEA:
      return _.omit(state, ['focusLngLat', 'newIdea', 'newComment']);
    case SAVE_IDEA_CATEGORY:
      return {
        ...state,
        newIdea: _.extend(state.newIdea, { category: action.category })
      };
    case SAVE_IDEA_COMMENT:
      return {
        ...state,
        newComment: action.comment
      };
    case SET_IDEA_INDEX_TO_UPDATE:
      return {
        ...state,
        ideaIndexToUpdate: action.index
      };
    case SET_TRIP_IDEA_TO_DELETE:
      return {
        ...state,
        tripIdeaToDelete: action.ideaId
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
    case SAVE_IDEA_UPDATED_CATEGORY:
      return {
        ...state,
        newCategory: action.category
      };
    case SAVE_IDEA_UPDATED_COMMENT:
      return {
        ...state,
        newComment: action.comment
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
    case SET_EDITING_IDEA:
      return {
        ...state,
        editingIdea: action.ideaId
      };
    case CLEAR_EDITING_IDEA:
      return _.omit(state, 'editingIdea', 'newCategory', 'newComment');
    case CLEAR_TRIP_ERROR:
      return _.omit(state, 'error');
    case SHOW_MODAL:
      if (action.modalId === tripSettings) {
        return {
          ..._.omit(state, 'error'),
          newFields: {}
        };
      } else {
        return _.omit(state, 'error');
      }
    case HIDE_MODAL:
      switch(action.modalId) {
        case deleteTripIdea:
          return _.omit(state, ['error', 'tripIdeaToDelete']);
        case tripSettings:
          return _.omit(state, ['error', 'newFields']);
        case tripIdeaSettings:
          return _.omit(
            state,
            ['error', 'ideaIndexToUpdate', 'updatedComment']
          );
        default:
          return state;
      }
    // API actions
    case API_GET_TRIP_REQUEST:
      return {
        ...(_.omit(state, ['error', 'trip'])),
        isFetching: true
      };
    case API_CREATE_TRIP_REQUEST:
    case API_ADD_TRIP_IDEA_REQUEST:
    case API_UPDATE_TRIP_IDEA_REQUEST:
    case API_DELETE_TRIP_IDEA_REQUEST:
    case API_UPDATE_TRIP_REQUEST:
      return {
        ...(_.omit(state, 'error')),
        isFetching: true
      };
    case API_UPDATE_TRIP_VIS_REQUEST:
      return {
        ...state,
        isFetchingVisibility: true
      };
    case API_GET_TRIP_SUCCESS:
      return {
        ..._.omit(state, 'error'),
        trip: action.trip,
        isFetching: false
      };
    case API_CREATE_TRIP_SUCCESS:
    case API_UPDATE_TRIP_SUCCESS:
      return {
        ..._.omit(state, 'error', 'newFields'),
        isFetching: false,
        isFetchingVisibility: false,
        trip: action.trip
      };
    case API_ADD_TRIP_IDEA_SUCCESS:
      return {
        ..._.omit(state, ['newIdea', 'newComment']),
        trip: _.extend(state.trip, {
          ideas: action.ideas,
          ideaCategories: action.ideaCategories
        }),
        isFetching: false,
        focusLngLat: action.ideas[0].loc.coordinates
      };
    case API_UPDATE_TRIP_IDEA_SUCCESS:
    case API_DELETE_TRIP_IDEA_SUCCESS:
      return {
        ..._.omit(state, [
          'focusLngLat',
          'hoverLngLat',
          'ideaIndexToUpdate',
          'newCategory',
          'newComment'
        ]),
        trip: _.extend(state.trip, {
          ideas: action.ideas,
          ideaCategories: action.ideaCategories
        }),
        isFetching: false
      };
    case API_CREATE_TRIP_FAILURE:
    case API_GET_TRIP_FAILURE:
    case API_UPDATE_TRIP_FAILURE:
    case API_ADD_TRIP_IDEA_FAILURE:
    case API_UPDATE_TRIP_IDEA_FAILURE:
    case API_DELETE_TRIP_IDEA_FAILURE:
      return {
        ...state,
        error: action.error,
        isFetching: false,
        isFetchingVisibility: false
      };
    case LOGOUT:
      return initialTripState;
  }

  return state;
}

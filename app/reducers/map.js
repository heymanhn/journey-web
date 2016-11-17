'use strict';

import _ from 'underscore';
import {
  SAVE_ICON_MARKERS,
  SAVE_HOVER_MARKER,
  DELETE_HOVER_MARKER,
  SAVE_FOCUS_MARKER,
  DELETE_FOCUS_MARKER,
  SHOW_ALL_TRIP_IDEAS,
  SHOW_ALL_TRIP_IDEAS_COMPLETE,
  SHOW_DESTINATION_ON_MAP,
  CHANGE_TO_MAP_VIEW,
  CHANGE_TO_SATELLITE_VIEW,
  VIEW_UPDATED,
  IDEA_DELETED,
  IDEA_UPDATED,
  LOGOUT
} from 'app/actions/map';
import {
  API_DELETE_TRIP_IDEA_SUCCESS,
  API_UPDATE_TRIP_IDEA_SUCCESS
} from 'app/actions/trips';
import { initialMapState } from 'app/constants';

export default function mapState(state = initialMapState, action) {
  switch (action.type) {
    case SAVE_ICON_MARKERS:
      return {
        ...state,
        iconMarkers: action.markers
      };
    case SAVE_HOVER_MARKER:
      return { ...state, hoverMarker: action.marker };
    case DELETE_HOVER_MARKER:
      return _.omit(state, 'hoverMarker');
    case SAVE_FOCUS_MARKER:
      return { ...state, focusMarker: action.marker };
    case DELETE_FOCUS_MARKER:
      return _.omit(state, 'focusMarker');
    case SHOW_ALL_TRIP_IDEAS:
      return { ...state, fitMapRequest: 'ideas' };
    case SHOW_DESTINATION_ON_MAP:
      return { ...state, fitMapRequest: 'destination' };
    case SHOW_ALL_TRIP_IDEAS_COMPLETE:
      return _.omit(state, 'fitMapRequest');
    case CHANGE_TO_MAP_VIEW:
      return {
        ...state,
        mapStyle: 'map',
        viewChanged: state.mapStyle !== 'map'
      };
    case CHANGE_TO_SATELLITE_VIEW:
      return {
        ...state,
        mapStyle: 'satellite',
        viewChanged: state.mapStyle !== 'satellite'
      };
    case VIEW_UPDATED:
      return { ...state, viewChanged: false };
    case IDEA_UPDATED:
      return _.omit(state, 'ideaToUpdate');
    case IDEA_DELETED:
      return _.omit(state, 'ideaToDelete');
    case API_UPDATE_TRIP_IDEA_SUCCESS:
      return { ...state, ideaToUpdate: action.updatedIdea };
    case API_DELETE_TRIP_IDEA_SUCCESS:
      return { ...state, ideaToDelete: action.deletedIdea };
    case LOGOUT:
      return initialMapState;
  }

  return state;
}

'use strict';

import _ from 'underscore';
import {
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
  LOGOUT
} from 'app/actions/map';
import { initialMapState } from 'app/constants';

export default function mapState(state = initialMapState, action) {
  switch (action.type) {
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
      return { ...state, viewChanged: false }
    case LOGOUT:
      return initialMapState;
  }

  return state;
}

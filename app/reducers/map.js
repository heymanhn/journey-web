'use strict';

import _ from 'underscore';
import {
  SAVE_MARKERS,
  SAVE_HOVER_MARKER,
  DELETE_HOVER_MARKER,
  SAVE_FOCUS_MARKER,
  DELETE_FOCUS_MARKER,
  UPDATE_MAP_WIDTH,
  SHOW_ALL_TRIP_IDEAS,
  SHOW_ALL_TRIP_IDEAS_COMPLETE,
  LOGOUT
} from 'app/actions/map';
import { initialMapState } from 'app/constants';

export default function mapState(state = initialMapState, action) {
  switch (action.type) {
    case SAVE_MARKERS:
      return { ...state, markers: action.markers };
    case SAVE_HOVER_MARKER:
      return { ...state, hoverMarker: action.marker };
    case DELETE_HOVER_MARKER:
      return _.omit(state, 'hoverMarker');
    case SAVE_FOCUS_MARKER:
      return { ...state, focusMarker: action.marker };
    case DELETE_FOCUS_MARKER:
      return _.omit(state, 'focusMarker');
    case UPDATE_MAP_WIDTH:
      return { ...state, mapWidth: action.width };
    case SHOW_ALL_TRIP_IDEAS:
      return { ...state, fitMapRequest: true };
    case SHOW_ALL_TRIP_IDEAS_COMPLETE:
      return _.omit(state, 'fitMapRequest');
    case LOGOUT:
      return initialMapState;
  }

  return state;
}

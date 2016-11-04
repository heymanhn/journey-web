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
  LOGOUT
} from 'app/actions/map';

export default function mapState(state = {}, action) {
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
    case LOGOUT:
      return {};
  }

  return state;
}

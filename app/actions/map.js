'use strict';

/*
 * Action Types
 */

export const SAVE_HOVER_MARKER = 'SAVE_HOVER_MARKER';
export const DELETE_HOVER_MARKER = 'DELETE_HOVER_MARKER';
export const SAVE_FOCUS_MARKER = 'SAVE_FOCUS_MARKER';
export const DELETE_FOCUS_MARKER = 'DELETE_FOCUS_MARKER';
export const SHOW_ALL_TRIP_IDEAS = 'SHOW_ALL_TRIP_IDEAS;'
export const SHOW_ALL_TRIP_IDEAS_COMPLETE = 'SHOW_ALL_TRIP_IDEAS_COMPLETE';
export const SHOW_DESTINATION_ON_MAP = 'SHOW_DESTINATION_ON_MAP';
export const CHANGE_TO_MAP_VIEW = 'CHANGE_TO_MAP_VIEW';
export const CHANGE_TO_SATELLITE_VIEW = 'CHANGE_TO_SATELLITE_VIEW';
export const VIEW_UPDATED = 'VIEW_UPDATED';
export const IDEA_UPDATED = 'IDEA_UPDATED';
export const SET_POPUP_TIMESTAMP = 'SET_POPUP_TIMESTAMP';
export const CLEAR_POPUP_TIMESTAMP = 'CLEAR_POPUP_TIMESTAMP';


/*
 * Action Creators
 */

export function saveHoverMarker(marker) {
  return {
    type: SAVE_HOVER_MARKER,
    marker
  };
}

export function deleteHoverMarker() {
  return {
    type: DELETE_HOVER_MARKER
  };
}

export function saveFocusMarker(marker) {
  return {
    type: SAVE_FOCUS_MARKER,
    marker
  };
}

export function deleteFocusMarker() {
  return {
    type: DELETE_FOCUS_MARKER
  };
}

export function showAllTripIdeasOnMap() {
  return {
    type: SHOW_ALL_TRIP_IDEAS
  };
}

export function showDestinationOnMap() {
  return {
    type: SHOW_DESTINATION_ON_MAP
  };
}

export function showAllTripIdeasComplete() {
  return {
    type: SHOW_ALL_TRIP_IDEAS_COMPLETE
  };
}

export function changeToMapView() {
  return {
    type: CHANGE_TO_MAP_VIEW
  };
}

export function changeToSatelliteView() {
  return {
    type: CHANGE_TO_SATELLITE_VIEW
  };
}

export function viewUpdated() {
  return {
    type: VIEW_UPDATED
  };
}

export function ideaUpdated() {
  return {
    type: IDEA_UPDATED
  };
}

export function setPopupTimestamp(ideaId) {
  return {
    type: SET_POPUP_TIMESTAMP,
    timestamp: Date.now(),
    ideaId
  };
}

export function clearPopupTimestamp() {
  return {
    type: CLEAR_POPUP_TIMESTAMP
  };
}

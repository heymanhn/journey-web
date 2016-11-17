'use strict';

/*
 * Action Types
 */

export const SAVE_ICON_MARKERS = 'SAVE_ICON_MARKERS';
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
export const IDEA_DELETED = 'IDEA_DELETED';


/*
 * Action Creators
 */

export function saveIconMarkers(markers) {
  return {
    type: SAVE_ICON_MARKERS,
    markers
  };
}

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

export function ideaDeleted() {
  return {
    type: IDEA_DELETED
  };
}

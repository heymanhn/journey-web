'use strict';

/*
 * Action Types
 */

export const SAVE_MARKERS = 'SAVE_MARKERS';
export const SAVE_HOVER_MARKER = 'SAVE_HOVER_MARKER';
export const DELETE_HOVER_MARKER = 'DELETE_HOVER_MARKER';
export const SAVE_FOCUS_MARKER = 'SAVE_FOCUS_MARKER';
export const DELETE_FOCUS_MARKER = 'DELETE_FOCUS_MARKER';


/*
 * Action Creators
 */

export function saveMarkers(markers) {
  return {
    type: SAVE_MARKERS,
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

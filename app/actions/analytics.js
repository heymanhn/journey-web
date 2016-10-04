'use strict';

import _ from 'underscore';
import fetch from 'isomorphic-fetch';
import { fetchOptsTemplate, handleErrors, journeyAPI } from '../constants';

/*
 * Action Creator thunks
 */

export function apiTrackEvent(event, properties) {
  return (dispatch, getState) => {
    const trackEvent = journeyAPI.analytics.track();
    let opts = {
      ...fetchOptsTemplate,
      method: trackEvent.method,
      body: JSON.stringify({ event, properties })
    };
    opts.headers['Authorization'] = getState().authState.token;

    fetch(trackEvent.route, opts)
      .then(handleErrors)
      .catch(error => console.log(`Track event error: ${error.message}`));
  };
}

export function apiPageEvent(name, properties, category) {
  return (dispatch, getState) => {
    const pageEvent = journeyAPI.analytics.page();
    let opts = {
      ...fetchOptsTemplate,
      method: pageEvent.method,
      body: JSON.stringify({ name, properties, category })
    };
    opts.headers['Authorization'] = getState().authState.token;

    fetch(pageEvent.route, opts)
      .then(handleErrors)
      .catch(error => console.log(`Page event error: ${error.message}`));
  };
}

export function apiTripPageEvent(name, properties, category) {
  return (dispatch, getState) => {
    // Append trip ID as a property if it's not already added
    if (!properties.tripId) {
      const { _id: tripId } = getState().tripState.trip;
      properties = _.extend(properties, { tripId });
    }

    dispatch(apiPageEvent(name, properties, category));
  };
}

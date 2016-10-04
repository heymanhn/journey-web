'use strict';

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

export function apiPageEvent(name, category, properties) {
  return (dispatch, getState) => {
    const pageEvent = journeyAPI.analytics.page();
    let opts = {
      ...fetchOptsTemplate,
      method: pageEvent.method,
      body: JSON.stringify({ name, category, properties })
    };
    opts.headers['Authorization'] = getState().authState.token;

    fetch(pageEvent.route, opts)
      .then(handleErrors)
      .catch(error => console.log(`Page event error: ${error.message}`));
  };
}

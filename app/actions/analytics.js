'use strict';

import _ from 'underscore';
import fetch from 'isomorphic-fetch';
import { createAnonymousId } from './auth';
import {
  fetchOptsTemplate,
  generateGUID,
  handleErrors,
  journeyAPI
} from '../constants';

/*
 * Action Creator thunks
 */

export function apiIdentifyGuest() {
  return (dispatch, getState) => {
    const anonymousId = generateGUID();
    dispatch(createAnonymousId(anonymousId));

    const identifyUser = journeyAPI.analytics.identify();
    let opts = {
      ...fetchOptsTemplate({ anonymousId }),
      method: identifyUser.method
    };

    return fetch(identifyUser.route, opts)
      .then(handleErrors)
      .then(() => { console.log(`User identified: ${anonymousId}`); })
      .catch(error => console.log(`Identify User error: ${error.message}`));
  };
}

export function apiTrackEvent(event, properties) {
  return (dispatch, getState) => {
    const trackEvent = journeyAPI.analytics.track();
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: trackEvent.method,
      body: JSON.stringify({ event, properties })
    };

    return fetch(trackEvent.route, opts)
      .then(handleErrors)
      .then(() => { console.log(`Event tracked: ${event}`); })
      .catch(error => console.log(`Track event error: ${error.message}`));
  };
}

export function apiPageEvent(name, properties, category) {
  return (dispatch, getState) => {
    const pageEvent = journeyAPI.analytics.page();
    let opts = {
      ...fetchOptsTemplate(getState().authState),
      method: pageEvent.method,
      body: JSON.stringify({ name, properties, category })
    };

    return fetch(pageEvent.route, opts)
      .then(handleErrors)
      .then(() => { console.log(`Page tracked: ${name}`); })
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

'use strict';

import MobileDetect from 'mobile-detect';

/*
 * Network request constants
 */
const journeyAPIHost = API_SERVER || 'http://localhost:3000/v1';

export const journeyAPI = {
  login: () => ({
    method: 'POST',
    route: journeyAPIHost + '/auth/login'
  }),

  signup: () => ({
    method: 'POST',
    route: journeyAPIHost + '/users'
  }),

  trips: {
    get: (userId) => ({
      method: 'GET',
      route: journeyAPIHost + '/users/' + userId + '/trips?count=100'
    }),
    create: () => ({
      method: 'POST',
      route: journeyAPIHost + '/trips'
    })
  },

  trip: {
    get: (tripId) => ({
      method: 'GET',
      route: journeyAPIHost + '/trips/' + tripId
    }),
    delete: (tripId) => ({
      method: 'DELETE',
      route: journeyAPIHost + '/trips/' + tripId
    }),
    ideas: {
      create: (tripId) => ({
        method: 'POST',
        route: journeyAPIHost + '/trips/' + tripId + '/ideas'
      }),
      update: (tripId, ideaId) => ({
        method: 'PUT',
        route: journeyAPIHost + '/trips/' + tripId + '/ideas/' + ideaId
      }),
      delete: (tripId, ideaId) => ({
        method: 'DELETE',
        route: journeyAPIHost + '/trips/' + tripId + '/ideas/' + ideaId
      })
    }
  },

  analytics: {
    track: () => ({
      method: 'POST',
      route: journeyAPIHost + '/analytics/track'
    })
  }
};

export const fetchOptsTemplate = {
  mode: 'cors',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
};

export const handleErrors = (response) => {
  if (response.ok) {
    return response;
  } else {
    return response.json().then(json => Promise.reject(json));
  }
};


/*
 * Redux store default states
 */
export const initialAuthState = {
  isFetching: false
};

export const initialTripsState = {
  isFetching: false,
  trips: []
};

export const initialTripState = {
  isFetching: false,
  resetIdeaBox: false
};

/*
 * Drag and drop functionality variables
 */
export const dndTypes = {
  IDEA: 'idea'
};

const md = new MobileDetect(window.navigator.userAgent);
export const isMobile = md.mobile() ? true : false;

/*
 * Mapbox API
 */
export const mapbox = {
  displayOffset: 400,
  streetsStyle: 'mapbox://styles/mapbox/streets-v9',
  token: 'pk.eyJ1IjoiaGV5bWFuaG4iLCJhIjoiNTB1bjhNNCJ9.reogg5avP170MBu9SMc7EA'
};

export const mapMarkers = {
  diameter: 15,
  icon: {
    width: 25,
    height: 41
  }
};

/*
 * Analytics Event Names
 */
export const analytics = {
  events: {
    LOG_OUT: 'Log Out'
  }
};

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
    update: (tripId) => ({
      method: 'PUT',
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
    identify: () => ({
      method: 'POST',
      route: journeyAPIHost + '/analytics/identify'
    }),
    track: () => ({
      method: 'POST',
      route: journeyAPIHost + '/analytics/track'
    }),
    page: () => ({
      method: 'POST',
      route: journeyAPIHost + '/analytics/page'
    })
  }
};

export function fetchOptsTemplate(authState) {
  let opts = {
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  const { anonymousId, token } = authState;
  if (token) {
    opts.headers['Authorization'] = token;
  } else {
    opts.headers['AnonymousID'] = anonymousId;
  }

  return opts;
}

export function handleErrors(response) {
  if (response.ok) {
    return response;
  } else {
    return response.json().then(json => Promise.reject(json));
  }
}


/*
 * Web app layout constants
 */
export const dimensions = {
  leftColumn: {
    width: 400
  },
  navigationBar: {
    height: 60
  },
  sidePadding: 30,
  tripsPage: {
    listItem: {
      height: 250,
      width: 300
    },
    width: 700
  }
};

export const colors = {
  primary: "rgb(233, 30, 99)",
  primaryDark: "rgb(143, 23, 64)",
  primaryError: "rgba(233, 30, 99, 0.2)",
  secondary: "rgb(26, 118, 200)"
};


/*
 * Redux store default states
 */

export function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

export const initialAuthState = {
  isFetching: false
};

export const initialMapState = {
  mapWidth: calcMapWidth()
};

export const initialNavBarState = {
  gravatarFocused: false,
  tooltipVisible: false
};

export const initialACState = {
  input: '',
  isFetchingAC: false,
  isFetchingPlace: false,
  placeSelected: false,
  results: []
};

export const initialModalState = {
  showModal: false
};

export const initialTripsState = {
  isFetching: false,
  trips: []
};

export const initialTripState = {
  isFetching: false,
  isFetchingVisibility: false
};


/*
 * Autocomplete component IDs
 */
export const acComponents = {
  tripAC: 'tripAC',
  tripIdeaAC: 'tripIdeaAC'
};


/*
 * Modal component IDs
 */
export const modalComponents = {
  tripSettings: 'tripSettings',
  tripIdeaSettings: 'tripIdeaSettings'
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
  ids: {
    hover: 'hoverTargets',
    markers: 'ideaMarkers'
  },
  staticImage: {
    height: dimensions.tripsPage.listItem.height - 70,
    url: 'https://api.mapbox.com/styles/v1/heymanhn/',
    width: dimensions.tripsPage.listItem.width - 2
  },
  styleURL: 'mapbox://styles/heymanhn/',
  streetsStyleId: 'citkhed0r002r2iqh4v6b8k1l',
  streetsNoLabelsStyleId: 'ciuizxxtn00492is1dvf2tbw0',
  token: 'pk.eyJ1IjoiaGV5bWFuaG4iLCJhIjoiNTB1bjhNNCJ9.reogg5avP170MBu9SMc7EA'
};

export const mapMarkers = {
  radius: 7,
  icon: {
    width: 29,
    height: 40
  }
};

export function generateMapImage(lng, lat, zoom) {
  const {
    staticImage: { height, url, width },
    streetsNoLabelsStyleId: styleId,
    token
  } = mapbox;

  return `${url}${styleId}/static/${lng},${lat},${zoom}/${width}x${height}?` +
    `access_token=${token}&attribution=false&logo=false`;
}

export function calcMapWidth() {
  return window.innerWidth - dimensions.leftColumn.width;
}


/*
 * Analytics Event Names
 */
export const analytics = {
  events: {
    LOG_OUT: 'Log Out'
  },
  pages: {
    LANDING_PAGE: 'Landing Page',
    SIGNUP_PAGE: 'Signup Page',
    TRIP_PAGE: 'Trip Page',
    TRIP_IDEA: 'Trip Idea',
    TRIPS_PAGE: 'Trips Page'
  }
};

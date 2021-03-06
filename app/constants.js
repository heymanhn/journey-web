'use strict';

import MobileDetect from 'mobile-detect';
import { apiIdentifyGuest } from 'app/actions/analytics';
import { processExpiryLogout } from 'app/actions/auth';

/*
 * Network request constants
 */
const journeyAPIHost = API_SERVER || 'https://localhost:3000/v1';

export const journeyAPI = {
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
  },

  login: () => ({
    method: 'POST',
    route: journeyAPIHost + '/auth/login'
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

  user: {
    signup: () => ({
      method: 'POST',
      route: journeyAPIHost + '/users'
    }),
    get: (userId) => ({
      method: 'GET',
      route: journeyAPIHost + '/users/' + userId
    }),
    update: (userId) => ({
      method: 'PUT',
      route: journeyAPIHost + '/users/' + userId
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

export function handleErrors(dispatch, response) {
  if (response.ok) {
    return response;
  } else {
    return response
      .json()
      .then(json => {
        // If JWT is no longer valid, log out
        if (json.message === 'Invalid JWT Token') {
          dispatch(processExpiryLogout());
          return Promise.reject();
        }

        return Promise.reject(json);
      });
  }
}


/*
 * Web app layout constants
 */
export const dimensions = {
  centeredPage: {
    width: 700
  },
  leftColumn: {
    margin: 20,
    width: 420
  },
  navigationBar: {
    height: 60
  },
  sidePadding: 30,
  tripsPage: {
    listItem: {
      height: 250,
      width: 300
    }
  }
};

export const colors = {
  background: "rgba(249, 249, 249, 1)",
  primary: "rgba(233, 30, 99, 1)",
  primaryDark: "rgb(143, 23, 64)",
  primaryError: "rgb(251, 210, 224)",
  primaryText: "rgb(51, 51, 51)",
  secondary: "rgb(26, 118, 200)"
};


/*
 * Animation durations
 */
export const transitions = {
  landingPageFrame: 200,
  submitButtonSuccess: 2000,
  tripPageError: {
    enter: 500,
    leave: 700
  }
};


/*
 * Mapbox API
 */
export const mapbox = {
  ids: {
    hover: 'hoverTargets',
    markers: 'ideaMarkers'
  },
  staticImage: {
    height: dimensions.tripsPage.listItem.height - 62,
    url: 'https://api.mapbox.com/styles/v1/',
    width: dimensions.tripsPage.listItem.width - 2
  },
  styleURL: 'mapbox://styles/',
  satelliteStreetsStyleId: 'heymanhn/civnemo11000w2jrzbfw7ai7a',
  streetsStyleId: 'heymanhn/citkhed0r002r2iqh4v6b8k1l',
  streetsNoLabelsStyleId: 'heymanhn/ciuizxxtn00492is1dvf2tbw0',
  token: 'pk.eyJ1IjoiaGV5bWFuaG4iLCJhIjoiNTB1bjhNNCJ9.reogg5avP170MBu9SMc7EA'
};

export const mapMarkers = {
  places: {
    radius: 8
  },
  categories: {
    radius: 17.5
  },
  icon: {
    width: 29,
    height: 40
  },
  popupDelay: 500
};

/* Helper function for zoom level calculation
 * Inspired with gratitude from:
 * http://stackoverflow.com/questions/6048975/google-maps-v3-how-to-calculate-the-zoom-level-for-a-given-bounds
 */
export function getZoomLevel(bounds) {
  const WORLD_DIM = { height: 256, width: 256 };

  // Mapbox zoom levels start at 1 instead of 0. So a max zoom level of 20
  // should be stored as 19
  const ZOOM_MAX = 19;

  function latRad(lat) {
    const sin = Math.sin(lat * Math.PI / 180);
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx, worldPx, fraction) {
    // Subtract 1 to line up to Mapbox zoom level format
    return (Math.log(mapPx / worldPx / fraction) / Math.LN2) - 1;
  }

  const [neLng, neLat] = bounds.northeast.coordinates;
  const [swLng, swLat] = bounds.southwest.coordinates;

  const latFraction = (latRad(neLat) - latRad(swLat)) / Math.PI;

  const lngDiff = neLng - swLng;
  const lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

  const { height, width } = mapbox.staticImage;
  const latZoom = zoom(height, WORLD_DIM.height, latFraction);
  const lngZoom = zoom(width, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
}

export function generateMapImage(lng, lat, zoom) {
  const {
    staticImage: { height, url, width },
    streetsNoLabelsStyleId: styleId,
    token
  } = mapbox;

  return `${url}${styleId}/static/${lng},${lat},${zoom}/${width}x${height}?` +
    `access_token=${token}&attribution=false&logo=false`;
}


/*
 * Redux store default states
 */

export function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

export const initialACState = {
  input: '',
  isFetchingAC: false,
  isFetchingPlace: false,
  placeSelected: false,
  results: []
};

export const initialAuthState = {
  isFetching: false,
  loginFields: {},
  signupFields: {},
  newUserFields: {}
};

export const initialFiltersState = {
  categories: []
};

export const initialDropdownState = {
  showDropdown: false
};

export const initialLPState = {
  frame: 'signup',
  overrideFrame: ''
};

export const initialMapState = {
  mapStyle: 'map',
  viewChanged: false
};

export const initialModalState = {
  showModal: false
};

export const initialNavBarState = {
  gravatarFocused: false,
  tooltipVisible: false
};

export const initialTripsState = {
  isFetching: false
};

export const initialTripState = {
  isFetching: false,
  isFetchingVisibility: false
};

export const initialTripPageState = {
  pageHeight: window.innerHeight
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
  deleteTrip: 'deleteTrip',
  deleteTripIdea: 'deleteTripIdea',
  tripSettings: 'tripSettings'
};


/*
 * Trip Page dropdown component IDs
 */
export const dropdownComponents = {
  addTripIdeas: 'addTripIdeas',
  filterTripIdeas: 'filterTripIdeas'
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
 * Analytics Event Names
 */
export const analytics = {
  events: {
    JWT_EXPIRED: 'Authentication Expired',
    LOG_OUT: 'Log Out'
  },
  pages: {
    SIGNUP_PAGE: 'Landing Page (Signup)',
    LOGIN_PAGE: 'Landing Page (Login)',
    TRIP_PAGE: 'Trip Page',
    TRIP_IDEA: 'Trip Idea',
    TRIPS_PAGE: 'Trips Page'
  }
};


/*
 * Trip idea types: mappings to categories
 */
const IDEA_CATEGORY_FOOD = 'Food';
const IDEA_CATEGORY_LODGING = 'Lodging';
const IDEA_CATEGORY_NIGHTLIFE = 'Nightlife';
export const IDEA_CATEGORY_PLACE = 'Place';
const IDEA_CATEGORY_RECREATION = 'Recreation';
const IDEA_CATEGORY_SHOPPING = 'Shopping';
const IDEA_CATEGORY_SIGHTSEEING = 'Sightseeing';
const IDEA_CATEGORY_TRANSPORTATION = 'Transportation';

export const categoryIcons = {
  [IDEA_CATEGORY_FOOD]: '🍲',
  [IDEA_CATEGORY_LODGING]: '🏠',
  [IDEA_CATEGORY_NIGHTLIFE]: '🍷',
  [IDEA_CATEGORY_RECREATION]: '🏖',
  [IDEA_CATEGORY_SHOPPING]: '🎁',
  [IDEA_CATEGORY_SIGHTSEEING]: '⛰',
  [IDEA_CATEGORY_TRANSPORTATION]: '🚗'
};

export const categoryMapIcons = {
  [IDEA_CATEGORY_FOOD]: {
    name: 'food-icon',
    size: 0.35
  },
  [IDEA_CATEGORY_LODGING]: {
    name: 'lodging-icon',
    size: 0.3
  },
  [IDEA_CATEGORY_NIGHTLIFE]: {
    name: 'nightlife-icon',
    size: 0.35
  },
  [IDEA_CATEGORY_RECREATION]: {
    name: 'recreation-icon',
    size: 0.3
  },
  [IDEA_CATEGORY_SHOPPING]: {
    name: 'shopping-icon',
    size: 0.35
  },
  [IDEA_CATEGORY_SIGHTSEEING]: {
    name: 'sightseeing-icon',
    size: 0.25
  },
  [IDEA_CATEGORY_TRANSPORTATION]: {
    name: 'transportation-icon',
    size: 0.4
  }
}

export function getCategoryForIdeaTypes(types) {
  let selectedType;
  for (const type of types) {
    selectedType = getCategoryForIdeaType(type);
    if (selectedType) {
      break;
    }
  }

  return selectedType || IDEA_CATEGORY_PLACE;
}

function getCategoryForIdeaType(type) {
  switch(type) {
    case 'bakery':
    case 'cafe':
    case 'food':
    case 'meal_delivery':
    case 'meal_takeaway':
    case 'restaurant':
      return IDEA_CATEGORY_FOOD;
    case 'lodging':
      return IDEA_CATEGORY_LODGING;
    case 'bar':
    case 'night_club':
      return IDEA_CATEGORY_NIGHTLIFE;
    case 'amusement_park':
    case 'aquarium':
    case 'art_gallery':
    case 'campground':
    case 'museum':
    case 'park':
    case 'spa':
    case 'stadium':
    case 'zoo':
      return IDEA_CATEGORY_RECREATION;
    case 'book_store':
    case 'clothing_store':
    case 'department_store':
    case 'furniture_store':
    case 'shopping_mall':
    case 'store':
      return IDEA_CATEGORY_SHOPPING;
    case 'establishment':
    case 'locality':
    case 'natural_feature':
    case 'place_of_worship':
    case 'premise':
    case 'point_of_interest':
    case 'subpremise':
      return IDEA_CATEGORY_SIGHTSEEING;
    case 'airport':
    case 'bus_station':
    case 'taxi_stand':
    case 'train_station':
    case 'transit_station':
      return IDEA_CATEGORY_TRANSPORTATION;
    default:
      return null;
  }
}

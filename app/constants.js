'use strict';

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
      route: journeyAPIHost + '/users/' + userId + '/trips'
    }),
    create: () => ({
      method: 'POST',
      route: journeyAPIHost + '/trips'
    })
  }
};

export const initialAuthState = {
  isFetching: false
};

export const initialTripsState = {
  isFetching: false,
  trips: []
};

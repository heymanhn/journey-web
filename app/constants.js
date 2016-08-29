'use strict';

const journeyAPIHost = 'https://localhost:3000/v1';

export const journeyAPI = {
  login: {
    method: 'POST',
    route: journeyAPIHost + '/auth/login'
  },
  signup: {
    method: 'POST',
    route: journeyAPIHost + '/users'
  }
};

export const initialAuthState = {
  isFetching: false
};

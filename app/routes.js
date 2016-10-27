'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'app/containers/App';
import Home from 'app/containers/Home';
import Login from 'app/containers/Login';
import Navigation from 'app/containers/Navigation';
import Trip from 'app/containers/Trip';
import Trips from 'app/containers/Trips';

export default function getRoutes(store) {
  const requireAuth = (nextState, replace) => {
    const { token } = store.getState().authState;

    if (!token) {
      replace({ pathname: '/login' });
    }
  };

  return (
    <Route path='/' component={App}>
      <IndexRoute components={{ content: Home, navigation: Navigation }} />
      <Route path='/login' components={{ content: Login }} />
      <Route
        path='/trips'
        components={{ content: Trips, navigation: Navigation }}
        onEnter={requireAuth}
      />
      <Route path='/trips/:tripId' components={{ content: Trip }} />
    </Route>
  );
}

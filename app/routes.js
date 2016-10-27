'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Trip from './containers/Trip';
import Trips from './containers/Trips';

export default function getRoutes(store) {
  const requireAuth = (nextState, replace) => {
    const { token } = store.getState().authState;

    if (!token) {
      replace({ pathname: '/login' });
    }
  };

  return (
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/trips' component={Trips} onEnter={requireAuth} />
      <Route path='/trips/:tripId' component={Trip} />
    </Route>
  );
}

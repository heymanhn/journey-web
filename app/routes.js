'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import AccountSettings from 'app/containers/AccountSettings';
import App from 'app/containers/App';
import Footer from 'app/components/Footer';
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
      <IndexRoute
        components={{
          content: Home,
          footer: Footer,
          navigation: Navigation
        }}
      />
      <Route path='/login' components={{ content: Login }} />
      <Route
        path='/account'
        components={{
          content: AccountSettings,
          footer: Footer,
          navigation: Navigation
        }}
        onEnter={requireAuth}
      />
      <Route
        path='/trips'
        components={{
          content: Trips,
          footer: Footer,
          navigation: Navigation
        }}
        onEnter={requireAuth}
      />
      <Route path='/trips/:tripId' components={{ content: Trip }} />
    </Route>
  );
}

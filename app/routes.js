'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Trip from './containers/Trip';
import Trips from './containers/Trips';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/trips' component={Trips} />
    <Route path='/trips/:tripId' component={Trip} />
  </Route>
);

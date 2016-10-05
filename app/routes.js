'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Signup from './containers/Signup';
import CreateTrip from './containers/CreateTrip';
import Trip from './containers/Trip';
import Trips from './containers/Trips';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='/signup' component={Signup} />
    <Route path='/createtrip' component={CreateTrip} />
    <Route path='/trips' component={Trips} />
    <Route path='/trips/:tripId' component={Trip} />
  </Route>
);

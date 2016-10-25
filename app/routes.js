'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Intro from './containers/Intro';
import Signup from './containers/Signup';
import Trip from './containers/Trip';
import Trips from './containers/Trips';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Intro} />
    <Route path='/signup' component={Signup} />
    <Route path='/trips' component={Trips} />
    <Route path='/trips/:tripId' component={Trip} />
  </Route>
);

'use strict';

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Signup from './containers/Signup';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='/signup' component={Signup}/>
  </Route>
);

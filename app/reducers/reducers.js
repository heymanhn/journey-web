'use strict';

import { combineReducers } from 'redux';
import authState from './auth';
import componentsState from './components';
import tripsState from './trips';
import tripState from './trip';

const appReducers = combineReducers({
  authState,
  componentsState,
  tripsState,
  tripState
});

export default appReducers;

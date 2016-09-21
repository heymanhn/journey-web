'use strict';

import { combineReducers } from 'redux';
import authState from './auth';
import tripsState from './trips';
import tripState from './trip';

const appReducers = combineReducers({
  authState,
  tripsState,
  tripState
});

export default appReducers;

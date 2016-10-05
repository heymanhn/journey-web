'use strict';

import { combineReducers } from 'redux';
import authState from './auth';
import mapState from './map';
import tripsState from './trips';
import tripState from './trip';

const appReducers = combineReducers({
  authState,
  mapState,
  tripsState,
  tripState
});

export default appReducers;

'use strict';

import { combineReducers } from 'redux';
import authState from './auth';
import mapState from './map';
import searchState from './search';
import tripsState from './trips';
import tripState from './trip';

const appReducers = combineReducers({
  authState,
  mapState,
  searchState,
  tripsState,
  tripState
});

export default appReducers;

'use strict';

import { combineReducers } from 'redux';
import authState from './auth';
import tripsState from './trips';

const appReducers = combineReducers({
  authState,
  tripsState
});

export default appReducers;

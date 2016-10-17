'use strict';

import { combineReducers } from 'redux';
import mapState from './map';
import autocompleteState from './autocomplete';

const componentsState = combineReducers({
  mapState,
  autocompleteState
});

export default componentsState;

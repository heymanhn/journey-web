'use strict';

import { combineReducers } from 'redux';
import autocompleteState from './autocomplete';
import mapState from './map';
import navBarState from './navBar';

const componentsState = combineReducers({
  autocompleteState,
  mapState,
  navBarState
});

export default componentsState;

'use strict';

import { combineReducers } from 'redux';
import autocompleteState from './autocomplete';
import mapState from './map';
import modalsState from './modals';
import navBarState from './navBar';

const componentsState = combineReducers({
  autocompleteState,
  mapState,
  modalsState,
  navBarState
});

export default componentsState;

'use strict';

import { combineReducers } from 'redux';
import autocompleteState from './autocomplete';
import dropdownsState from './dropdowns';
import filtersState from './filters';
import landingPageState from './landingPage';
import mapState from './map';
import modalsState from './modals';
import navBarState from './navBar';
import submitButtonState from './submitButton';
import tripPageState from './tripPage';

const componentsState = combineReducers({
  autocompleteState,
  dropdownsState,
  filtersState,
  landingPageState,
  mapState,
  modalsState,
  navBarState,
  submitButtonState,
  tripPageState
});

export default componentsState;

'use strict';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { autoRehydrate } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';

import Root from './containers/Root';
import reducers from './reducers';

const loggerMiddleware = createLogger();
const store = compose(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ),
  autoRehydrate()
)(createStore)(reducers);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} />,
  document.getElementById('app')
);

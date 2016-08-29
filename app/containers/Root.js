'use strict';

import localForage from 'localForage';
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { persistStore } from 'redux-persist';

import routes from '../routes';

export default class Root extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  // Moving the persistStore() call to this event handler to prevent the root
  // view from loading until after the store has been rehydrated
  componentWillMount() {
    persistStore(this.props.store, { storage: localForage }, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return null;
    }

    const { history, store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

'use strict';

import localForage from 'localforage';
import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { persistStore } from 'redux-persist';

import { apiIdentifyGuest } from '../actions/analytics';
import { isMobile } from '../constants';
import routes from '../routes';

class Root extends Component {
  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  /* Moving the persistStore() call to this event handler to prevent the root
   * view from loading until after the store has been rehydrated
   *
   * HINT: call persistStore(...).purge() to clear all data if things get out
   * of whack
   */
  componentWillMount() {
    const { store } = this.props;
    const config = {
      storage: localForage,
      blacklist: ['tripState']
    };

    persistStore(store, config, () => {
      // Don't render anything until the anonymousId is generated as well
      if (!store.getState().authState.anonymousId) {
        store
          .dispatch(apiIdentifyGuest())
          .then(() => {
            this.setState({ rehydrated: true });
          });
      } else {
        this.setState({ rehydrated: true });
      }
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

export default DragDropContext(isMobile ? TouchBackend : HTML5Backend)(Root);

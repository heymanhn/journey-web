'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { colors } from 'app/constants';

class App extends Component {
  componentWillMount() {
    document.body.style.backgroundColor = colors.background;
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = null;
  }

  render() {
    const { content, footer, navigation, token } = this.props;
    return (
      <div style={this.loadAppContainerStyle()}>
        {token && navigation}
        {content}
        {token && footer}
      </div>
    );
  }

  loadAppContainerStyle() {
    const { tooltipVisible } = this.props;
    const { container, fixedScroll } = styles;

    return tooltipVisible ? { ...container, ...fixedScroll } : container;
  }
}

const styles = {
  container: {
    height: "100%",
    overflow: "auto"
  },
  fixedScroll: {
    overflow: "hidden"
  }
};

export default connect(
  state => {
    const { authState, componentsState } = state;
    return {
      token: authState.token,
      tooltipVisible: componentsState.navBarState.tooltipVisible
    };
  }
)(App);

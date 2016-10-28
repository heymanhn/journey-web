'use strict';

import React, { Component, PropTypes } from 'react';
import Spinner from './Spinner';
import { colors } from 'app/constants';

class LoadingAnimation extends Component {
  render() {
    const { element } = this.props;

    return (
      <div>
        <p style={styles.loadingText}>Loading {element}</p>
        <div>
          <Spinner />
        </div>
      </div>
    );
  }
}

LoadingAnimation.propTypes = {
  element: PropTypes.string
};

const styles = {
  loadingText: {
    color: colors.primaryText,
    fontFamily: "Helvetica",
    fontSize: 24,
    textAlign: "center",
    margin: 20
  }
};

export default LoadingAnimation;

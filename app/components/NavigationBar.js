'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { viewLandingPage } from 'app/actions/navigation';
import { colors, dimensions } from 'app/constants';

class NavigationBar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <span onClick={viewLandingPage} style={styles.logo}>
          Journey
        </span>
        <Button
          onClick={viewLandingPage}
          style={styles.loginButton}
        >
          Log in
        </Button>
      </div>
    );
  }
}

NavigationBar.propTypes = {
};

const styles = {
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    display: 'flex',
    height: dimensions.navigationBar.height,
    justifyContent: 'space-between',
    padding: '0 ' + dimensions.leftColumn.sidePadding + ' 0',
    width: dimensions.leftColumn.width
  },
  loginButton: {
    background: 'linear-gradient(#ffffff, #e1e1e1)',
    padding: '4 12'
  },
  logo: {
    color: 'white',
    cursor: 'pointer',
    fontFamily: "'Lobster', cursive",
    fontSize: 32,
    position: 'relative',
    top: -3,

    // Disable text selection
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none'
  }
};

export default NavigationBar;

'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { viewLandingPage } from 'app/actions/navigation';
import { colors, dimensions } from 'app/constants';

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = { gravatarFocused: false };
  }

  render() {
    const { user } = this.props;
    const { gravatarFocused } = this.state;

    const loginButton = (
      <Button
        onClick={viewLandingPage}
        style={styles.loginButton}
      >
        Log in
      </Button>
    );

    const gravatar = user && (
      <div
        style={styles.gravatarBackground}

        // Attach to these mouse events to mimic active state for profile pic
        onMouseUp={this.onGravatarInactive.bind(this)}
        onDragEnd={this.onGravatarInactive.bind(this)}
        onMouseDown={this.onGravatarActive.bind(this)}
      >
        <img
          src={user.gravatar}
          style={gravatarFocused ? styles.gravatarDimmed : styles.gravatar}
        />
      </div>
    );

    return (
      <div style={styles.container}>
        <span onClick={viewLandingPage} style={styles.logo}>
          Journey
        </span>
        {user ? gravatar : loginButton}
      </div>
    );
  }

  onGravatarInactive() {
    this.setState({ gravatarFocused: false });
  }

  onGravatarActive() {
    this.setState({ gravatarFocused: true });
  }
}

NavigationBar.propTypes = {
  user: PropTypes.object
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
  gravatar: {
    borderRadius: '50%',
    cursor: 'pointer',
    width : 40
  },
  gravatarBackground: {
    backgroundColor: 'black',
    borderRadius: '50%'
  },
  gravatarDimmed: {
    borderRadius: '50%',
    width : 40,
    opacity: 0.8
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

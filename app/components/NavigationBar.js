'use strict';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { colors, dimensions } from 'app/constants';
import NavigationAvatar from './NavigationAvatar';

class NavigationBar extends Component {
  render() {
    const {
      gravatarFocused,
      onLogoutPress,
      onSetGravatarActive,
      onSetGravatarInactive,
      onSetOverrideFrameToLogin,
      onSetTooltipInvisible,
      onSetTooltipVisible,
      tooltipVisible,
      user
    } = this.props;

    const loginButton = (
      <Link
        onClick={onSetOverrideFrameToLogin}
        to="/"
      >
        <Button style={styles.loginButton}>
          Log in
        </Button>
      </Link>
    );

    function generateGravatar(user) {
      return (
        <NavigationAvatar
          gravatarFocused={gravatarFocused}
          name={user.name}
          onLogoutPress={onLogoutPress}
          onSetGravatarActive={onSetGravatarActive}
          onSetGravatarInactive={onSetGravatarInactive}
          onSetTooltipVisible={onSetTooltipVisible}
          onSetTooltipInvisible={onSetTooltipInvisible}
          tooltipVisible={tooltipVisible}
          picture={user.gravatar}
       />
     );
    }

    return (
      <div style={this.loadContainerStyle()}>
        <div style={styles.inlineBlock}>
          <div style={this.loadNavStyle()}>
            <span style={styles.logo}>
              <Link
                activeStyle={styles.vanillaLink}
                style={styles.vanillaLink}
                to="/"
              >
                Journey
              </Link>
            </span>
            {user ? generateGravatar(user) : loginButton}
          </div>
        </div>
      </div>
    );
  }

  loadContainerStyle() {
    const { customContainerStyle: customStyle } = this.props;
    const { container: containerStyle } = styles;
    return customStyle ? { ...containerStyle, ...customStyle } : containerStyle;
  }

  loadNavStyle() {
    const { customNavStyle } = this.props;
    const navStyle = styles.navSection;
    return customNavStyle ? { ...navStyle, ...customNavStyle } : navStyle;
  }
}

NavigationBar.propTypes = {
  customContainerStyle: PropTypes.object,
  customNavStyle: PropTypes.object,
  gravatarFocused: PropTypes.bool.isRequired,
  onLogoutPress: PropTypes.func.isRequired,
  onSetGravatarActive: PropTypes.func.isRequired,
  onSetGravatarInactive: PropTypes.func.isRequired,
  onSetOverrideFrameToLogin: PropTypes.func.isRequired,
  onSetTooltipInvisible: PropTypes.func.isRequired,
  onSetTooltipVisible: PropTypes.func.isRequired,
  tooltipVisible: PropTypes.bool.isRequired,
  user: PropTypes.object
};

const styles = {
  navSection: {
    alignItems: "center",
    display: "flex",
    height: dimensions.navigationBar.height,
    justifyContent: "space-between",
    width: dimensions.centeredPage.width,
    padding: "0 " + dimensions.sidePadding + " 0"
  },
  container: {
    backgroundColor: colors.primary,
    position: "fixed",
    textAlign: "center",
    top: 0,
    width: "100%",
    zIndex: 2
  },
  inlineBlock: {
    display: "inline-block"
  },
  loginButton: {
    background: "linear-gradient(#ffffff, #e1e1e1)",
    padding: "4 12"
  },
  logo: {
    color: "white",
    cursor: "pointer",
    fontFamily: "'Lobster', cursive",
    fontSize: 32,
    position: "relative",
    top: -3,

    // Disable text selection
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none"
  },
  vanillaLink: {
    color: "white",
    textDecoration: "none"
  }
};

export default NavigationBar;

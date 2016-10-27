'use strict';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { dimensions } from 'app/constants';

class Footer extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.footerSection}>
          <div style={styles.footerNavListItem}>
            <Link
              activeStyle={styles.vanillaLink}
              style={styles.vanillaLink}
              to="/"
            >
              Home
            </Link>
          </div>
          <div style={styles.footerNavListItem}>
            <Link
              activeStyle={styles.vanillaLink}
              style={styles.vanillaLink}
              to="/"
            >
              About
            </Link>
          </div>
          <div style={styles.footerNavListItem}>
            <Link
              activeStyle={styles.vanillaLink}
              style={styles.vanillaLink}
              to="/trips"
            >
              My Trips
            </Link>
          </div>
          <div style={styles.footerNavListItem}>
            <Link
              activeStyle={styles.vanillaLink}
              style={styles.vanillaLink}
              to="/"
            >
              Account
            </Link>
          </div>
          <div style={styles.copyrightListItem}>
            (c) Journey Labs 2016
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {};

const styles = {
  container: {
    backgroundColor: "#555555",
    height: 199,
    width: "100%"
  },
  copyrightListItem: {
    fontWeight: 500,
    marginLeft: "auto"
  },
  footerNavListItem: {
    marginRight: 50
  },
  footerSection: {
    alignItems: "center",
    color: "white",
    display: "flex",
    height: 200,
    listStyleType: "none",
    margin: "0px auto",
    maxWidth: dimensions.centeredPage.width,
    padding: "0px 30px"
  },
  vanillaLink: {
    color: "white",
    textDecoration: "none"
  }
};

export default Footer;

'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Spinner from './Spinner';
import { colors } from 'app/constants';

class TripSetting extends Component {
  render() {
    const { isDisabled, isLoading, onClick, title } = this.props;
    const imageURL = this.pickImage();

    let buttonImage;
    if (isLoading) {
      buttonImage = <Spinner customStyle={styles.spinner} />;
    } else {
      buttonImage = <img src={imageURL} style={styles.image} />;
    }

    return (
      <Button
        disabled={isLoading}
        onClick={!isDisabled ? onClick : null}
        style={this.loadContainerStyle()}
        title={this.loadTitle.bind(this)()}
      >
        {buttonImage}
        <span style={styles.title}>
          {title}
        </span>
      </Button>
    );
  }

  pickImage() {
    const { setting, title } = this.props;
    switch(setting) {
      case 'destination':
        return '../assets/setting-marker-icon.png';
      case 'visibility':
        switch(title) {
          case 'Public':
            return '../assets/setting-public-icon.png';
          case 'View Only':
            return '../assets/setting-viewonly-icon.png';
          case 'Private':
            return '../assets/setting-private-icon.png';
          default:
            return null;
        }
      case 'edit':
        return '../assets/setting-edit-icon.png';
      default:
        return null;
    }
  }

  loadContainerStyle() {
    const { isDisabled, isLoading, last, setting } = this.props;
    let { container: style, darkContainer: dark } = styles;

    if (last) {
      style.marginRight = 0;
    } else {
      style.marginRight = 5;
    }

    if (setting === 'edit') {
      return { ...style, ...dark };
    } else {
      if (isLoading || isDisabled) {
        return { ...style, cursor: "default" };
      } else {
        return style;
      }
    }
  }

  loadTitle() {
    const { setting } = this.props;
    switch(setting) {
      case 'destination':
        return 'Click to fit the map to this location';
      case 'visibility':
        return 'Click to toggle trip visibility';
      case 'edit':
        return 'Edit this trip';
      default:
        return null;
    }
  }
}

TripSetting.propTypes = {
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  last: PropTypes.bool,
  onClick: PropTypes.func,
  setting: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const styles = {
  container: {
    backgroundColor: "#f2f2f2",
    border: "1px solid #dddddd",
    borderRadius: 25,
    fontSize: 12,
    height: 26,
    margin: "0px 0px 10px 0px",
    outline: 0
  },
  darkContainer: {
    backgroundColor: colors.secondary,
    border: "1px solid " + colors.secondary,
    color: "#ffffff"
  },
  image: {
    display: "inline",
    maxHeight: 16,
    paddingRight: 5,
    position: "relative",
    top: -3
  },
  spinner: {
    float: "left",
    height: 20,
    left: 7,
    marginRight: 2,
    position: "relative",
    top: 10,
    width: 20
  },
  title: {
    position: "relative",
    top: -2
  }
};

export default TripSetting;

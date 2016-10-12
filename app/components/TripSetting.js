'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Spinner from './Spinner';

class TripSetting extends Component {
  render() {
    const { isLoading, onClick, title } = this.props;
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
        onClick={onClick}
        style={this.loadContainerStyle.bind(this)()}
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
        if (title === 'Public') {
          return '../assets/setting-public-icon.png';
        } else {
          return '../assets/setting-private-icon.png';
        }
      case 'edit':
        return '../assets/setting-edit-icon.png';
      default:
        return null;
    }
  }

  loadContainerStyle() {
    const { isLoading, setting } = this.props;
    const { container: style, darkContainer: dark } = styles;

    if (setting === 'edit') {
      return { ...style, ...dark };
    } else {
      if (isLoading) {
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
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  setting: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const styles = {
  container: {
    backgroundColor: "#f2f2f2",
    border: "1px solid #dddddd",
    borderRadius: 20,
    fontSize: 13,
    margin: "0px 5px 10px 0px",
    outline: 0,
    padding: "6px 12px 6px"
  },
  darkContainer: {
    backgroundColor: "#1a76c8",
    border: "1px solid #1a76c8",
    color: "#ffffff"
  },
  image: {
    display: "inline",
    paddingRight: 6
  },
  spinner: {
    float: "left",
    height: 20,
    left: 5,
    marginRight: 2,
    position: "relative",
    top: 10,
    width: 20
  },
  title: {
    position: "relative",
    top: 2
  }
};

export default TripSetting;

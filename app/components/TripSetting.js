'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class TripSetting extends Component {
  render() {
    const { onClick, title } = this.props;
    const imageURL = this.pickImage();
    return (
      <Button
        onClick={onClick}
        style={this.loadContainerStyle.bind(this)()}
        title={this.loadTitle.bind(this)()}
      >
        <img src={imageURL} style={styles.image}
        />
        <p style={styles.title}>{title}</p>
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
    const { setting } = this.props;
    const { container: style, darkContainer: dark } = styles;
    return setting === 'edit' ? { ...style, ...dark } : style;
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
    padding: "6px 14px 6px"
  },
  darkContainer: {
    backgroundColor: "#1a76c8",
    color: "#ffffff"
  },
  image: {
    paddingRight: 6
  },
  title: {
    display: "inline",
    position: "relative",
    top: 1
  }
};

export default TripSetting;

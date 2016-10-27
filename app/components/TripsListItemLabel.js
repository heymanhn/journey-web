'use strict';

import React, { Component, PropTypes } from 'react';
import { colors } from 'app/constants';

class TripsListItemLabel extends Component {
  render() {
    const contents = this.generateContents();
    return (
      <div style={styles.labelContainer}>
        {contents}
      </div>
    );
  }

  generateContents() {
    const { label, type } = this.props;

    if (type === 'destination') {
      return (
        <div style={styles.destinationLabel}>
          <img src="../assets/setting-marker-icon.png" style={styles.image} />
          <span style={styles.blackLabelText}>{label}</span>
        </div>
      );
    } else {
      return (
        <div style={styles.ideasLabel}>
          <span style={styles.redBulletPoint}>&#x25cf;</span>
          <span style={styles.redLabelText}>
            {label} {generateIdeasForm(label)}
          </span>
        </div>
      );
    }
  }
}

function generateIdeasForm(numIdeas) {
  numIdeas = Number(numIdeas);
  return numIdeas === 1 ? 'idea' : 'ideas';
}

TripsListItemLabel.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

const styles = {
  blackLabelText: {
    color: colors.primaryText,
  },
  destinationLabel: {
    margin: "6px 12px"
  },
  ideasLabel: {
    color: "#e91e63",
    fontWeight: "bold",
    margin: "4px 12px",
  },
  image: {
    height: 16,
    marginRight: 6,
    position: "relative",
    top: -1,
    width: 12
  },
  labelContainer: {
    backgroundColor: "#ffffff",
    border: "1px solid #b9b9b9",
    borderRadius: 25,
    fontSize: 13,
    margin: "0px 2px"
  },
  redBulletPoint: {
    fontSize: 16,
    marginRight: 6
  },
  redLabelText: {
    position: "relative",
    top: -1
  }
};

export default TripsListItemLabel;

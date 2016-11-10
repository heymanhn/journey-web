'use strict';

import React, { Component, PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';
import { colors, dimensions } from 'app/constants';

class TripIdeaLayout extends Component {
  render() {
    const { idea: { address, name, photo } } = this.props;

    return (
      <div style={styles.contentSection}>
        <div>
          <p style={styles.name}>{name}</p>
          <p style={styles.address}>{address}</p>
        </div>
        {photo && (
          <div style={styles.photoSection}>
            <img src={photo} style={styles.photo} />
          </div>
        )}
      </div>
    );
  }
}

TripIdeaLayout.propTypes = {
  idea: PropTypes.object.isRequired
};

const styles = {
  address: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 0
  },
  contentSection: {
    display: "flex",
    justifyContent: "space-between"
  },
  name: {
    fontSize: 14,
    fontWeight: "bold"
  },
  photo: {
    border: "1px solid #eeeeee",
    height: 60,
    objectFit: "cover",
    width: 60
  },
  photoSection: {
    height: 60,
    marginLeft: 10,
    width: 60
  }
};

export default TripIdeaLayout;

'use strict';

import React, { Component, PropTypes } from 'react';
import Textarea from 'react-textarea-autosize';
import { colors, dimensions, categoryIcons } from 'app/constants';

class TripIdeaLayout extends Component {
  render() {
    const { idea: { address, category, name, photo } } = this.props;
    const defaultCategoryIcon = (
      <img src="../assets/place-idea-icon.png" style={styles.defaultIcon} />
    );

    return (
      <div style={styles.contentSection}>
        <div style={styles.categoryIcon} title={category}>
          {categoryIcons[category] || defaultCategoryIcon}
        </div>
        <div style={styles.info}>
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
  categoryIcon: {
    fontSize: 16,
    marginRight: 12
  },
  contentSection: {
    display: "flex"
  },
  defaultIcon: {
    height: 12,
    marginLeft: 3,
    marginTop: 4,
    width: 12
  },
  info: {
    flexGrow: 1
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

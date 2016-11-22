'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import {
  colors,
  dimensions
} from 'app/constants';
import FilterCategoryDropdown from './FilterCategoryDropdown';

class FilterTripIdeasSection extends Component {
  render() {
    const { ideaCategories, onToggleFilterCategory } = this.props;

    return (
      <div style={styles.filterIdeasSection}>
        <FilterCategoryDropdown
          ideaCategories={ideaCategories}
          onToggleFilterCategory={onToggleFilterCategory}
        />
        <Button
          style={styles.clearButton}
        >
          <span style={styles.clearButtonLabel}>Clear</span>
        </Button>
      </div>
    );
  }
}

FilterTripIdeasSection.propTypes = {
  ideaCategories: PropTypes.array.isRequired,
  onToggleFilterCategory: PropTypes.func.isRequired
};

const styles = {
  clearButton: {
    backgroundColor: "white",
    border: "1px solid #dddddd",
    borderRadius: 25,
    color: colors.primaryText,
    fontSize: 13,
    height: 25,
    marginLeft: 15,
    padding: 0,
    width: 70
  },
  clearButtonLabel: {
    position: "relative",
    top: 1
  },
  filterIdeasSection: {
    alignItems: "center",
    backgroundColor: "#eeeeee",
    borderTop: "1px solid #dddddd",
    display: "flex",
    flexDirection: "row",
    padding: "15 " + dimensions.sidePadding
  }
};

export default FilterTripIdeasSection;

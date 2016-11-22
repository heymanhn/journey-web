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
    const {
      filterCategories,
      ideaCategories,
      onClearFilterCategories,
      onToggleFilterCategory
    } = this.props;

    return (
      <div style={styles.filterIdeasSection}>
        <FilterCategoryDropdown
          {..._.pick(this.props, [
            'filterCategories',
            'ideaCategories',
            'onToggleFilterCategory'
          ])}
        />
        <Button
          disabled={!filterCategories.length}
          onClick={onClearFilterCategories}
          style={this.loadClearButtonStyle()}
        >
          <span style={styles.clearButtonLabel}>Clear</span>
        </Button>
      </div>
    );
  }

  loadClearButtonStyle() {
    const { filterCategories } = this.props;
    const style = styles.clearButton;
    const disabledStyle = styles.clearButtonDisabled;

    return !filterCategories.length ? { ...style, ...disabledStyle } : style;
  }
}

FilterTripIdeasSection.propTypes = {
  filterCategories: PropTypes.array.isRequired,
  ideaCategories: PropTypes.array.isRequired,
  onClearFilterCategories: PropTypes.func.isRequired,
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
  clearButtonDisabled: {
    color: "#cccccc"
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

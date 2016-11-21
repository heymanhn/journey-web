'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import {
  colors,
  dimensions
} from 'app/constants';

class FilterTripIdeasSection extends Component {
  render() {
    return (
      <div style={styles.filterIdeasSection}>
        Filter ideas here
      </div>
    );
  }
}

FilterTripIdeasSection.propTypes = {

};

const styles = {
  filterIdeasSection: {
    backgroundColor: "#eeeeee",
    borderTop: "1px solid #dddddd",
    display: "flex",
    flexDirection: "row",
    padding: "12 " + dimensions.sidePadding
  }
};

export default FilterTripIdeasSection;

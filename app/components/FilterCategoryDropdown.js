'use strict';

import React, { Component, PropTypes } from 'react';
import { categoryIcons, colors, IDEA_CATEGORY_PLACE } from 'app/constants';

class FilterCategoryDropdown extends Component {
  componentDidMount() {
    window.addEventListener('click', () => this.dismissDropdown());
  }

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  render() {
    const {
      filterCategories,
      ideaCategories,
      onToggleFilterCategory
    } = this.props;
    const { visible } = this.state;

    const categoryDropdown = (
      <div style={styles.dropdown}>
        {ideaCategories.map(category => {
          const isEnabled = filterCategories.includes(category);
          return (
            <div
              key={category}
              onClick={onToggleFilterCategory.bind(null, category)}
              style={this.loadDropdownFieldStyle(category)}
            >
              <input
                checked={isEnabled}
                style={styles.checkbox}
                type="checkbox"
              />
              <div style={styles.categoryFieldIcon}>
                {this.loadCategoryIcon(category)}
              </div>
              <div style={styles.dropdownFieldLabel}>
                {category}
              </div>
            </div>
          );
        })}
      </div>
    );

    let categoryFilterStatus;
    const { length } = filterCategories;
    if (!length) {
      categoryFilterStatus = (
        <span style={styles.inputFieldLabel}>Choose Category</span>
      );
    } else if (length === 1) {
      const category = filterCategories[0];
      categoryFilterStatus = (
        <div style={styles.oneCategoryLabel}>
          <span style={styles.oneCategoryIcon}>
            {this.loadCategoryIcon(category)}
          </span>
          <span style={this.loadOneCategoryTextStyle(category)}>
            {category}
          </span>
        </div>
      );
    } else {
      categoryFilterStatus = (
        <span style={styles.inputFieldLabel}>
          {this.loadCategoryStatusText(length)}
        </span>
      );
    }

    return (
      <div>
        <div
          onClick={this.toggleVisible.bind(this)}
          style={styles.categoryField}
        >
          {categoryFilterStatus}
          <div>
            <img src="../assets/expand-arrow.png" />
          </div>
        </div>
        {visible && categoryDropdown}
      </div>
    )
  }

  loadCategoryIcon(category) {
    const defaultCategoryIcon = (
      <img src="../assets/place-idea-icon.png" style={styles.defaultIcon} />
    );

    return category === IDEA_CATEGORY_PLACE ?
      defaultCategoryIcon :
      categoryIcons[category];
  }

  loadDropdownFieldStyle(category, isEnabled) {
    const style = styles.dropdownField;
    return this.props.filterCategories.includes(category) ? {
      ...style,
      backgroundColor: "#e6f4ff",
      borderRight: "1px solid #dddddd"
    } : style;
  }

  loadOneCategoryTextStyle(category) {
    const style = styles.oneCategoryText;
    return category === IDEA_CATEGORY_PLACE ? { ...style, top: 1 } : style;
  }

  loadCategoryStatusText(numCategories) {
    const noun = numCategories === 1 ? 'Category' : 'Categories';
    return `${numCategories} ${noun}`;
  }

  toggleVisible(e) {
    e && e.stopPropagation();
    this.setState({ visible: !this.state.visible });
  }

  dismissDropdown() {
    return this.state.visible && this.toggleVisible();
  }
}

FilterCategoryDropdown.propTypes = {
  filterCategories: PropTypes.array.isRequired,
  ideaCategories: PropTypes.array.isRequired,
  onToggleFilterCategory: PropTypes.func.isRequired
};

const styles = {
  categoryField: {
    alignItems: "center",
    backgroundColor: "white",
    border: "1px solid #dddddd",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    fontSize: 13,
    height: 32,
    padding: "6px 12px",
    position: "relative",
    width: 160
  },
  categoryFieldIcon: {
    fontSize: 16,
    margin: "0px 12px 0px 5px"
  },
  categoryFieldLabel: {
    flexGrow: 1,
    fontSize: 13
  },
  checkbox: {
    marginLeft: 5,
    marginTop: 0
  },
  defaultIcon: {
    height: 12,
    marginLeft: 4,
    width: 12
  },
  dropdown: {
    backgroundColor: "white",
    border: "1px solid #dddddd",
    borderBottom: 0,
    boxShadow: "1px 1px 3px rgba(0,0,0,0.2)",
    display: "flex",
    flexFlow: "column wrap",
    position: "absolute",
    marginTop: 2,
    width: 160,
    zIndex: 1
  },
  dropdownField: {
    alignItems: "center",
    borderBottom: "1px solid #dddddd",
    cursor: "pointer",
    display: "flex",
    height: 30,
    padding: 5
  },
  dropdownFieldLabel: {
    fontSize: 13
  },
  inputFieldLabel: {
    flexGrow: 1,
    marginTop: 1
  },
  oneCategoryIcon: {
    fontSize: 16,
    marginRight: 12
  },
  oneCategoryLabel: {
    flexGrow: 1
  },
  oneCategoryText: {
    position: "relative",
    top: -1
  }
};

export default FilterCategoryDropdown;

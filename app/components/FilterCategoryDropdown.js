import React, { Component, PropTypes } from 'react';
import { categoryIcons, colors, IDEA_CATEGORY_PLACE } from 'app/constants';

class FilterCategoryDropdown extends Component {
  componentDidMount() {
    // Dismiss it only when clicking outside the dropdown
    window.addEventListener('click', () => this.dismissDropdown());
  }

  constructor(props) {
    super(props);

    this.state = {
      hover: '',
      visible: false
    };
  }

  render() {
    const { onToggleFilterCategory } = this.props;
    const { visible } = this.state;
    const defaultCategory = IDEA_CATEGORY_PLACE;
    const defaultCategoryIcon = (
      <img src="../assets/place-idea-icon.png" style={styles.defaultIcon} />
    );

    const key = 'Lodging';
    const categoryDropdown = (
      <div style={styles.dropdown}>
        <div
          key={key}
          onClick={onToggleFilterCategory.bind(null, key)}
          onMouseOver={this.onHover.bind(this, key)}
          onMouseOut={this.clearHover.bind(this)}
          style={this.loadDropdownFieldStyle(key)}
        >
          <div>
            <input
              onChange={onToggleFilterCategory.bind(null, key)}
              style={styles.checkbox}
              type="checkbox"
            />
          </div>
          <div style={styles.categoryFieldIcon}>
            {categoryIcons[key]}
          </div>
          <div style={styles.dropdownFieldLabel}>
            {key}
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <div
          onClick={this.toggleVisible.bind(this)}
          style={styles.categoryField}
        >
          <span style={styles.inputFieldLabel}>Choose Category</span>
          <div>
            <img src="../assets/expand-arrow.png" />
          </div>
        </div>
        {visible && categoryDropdown}
      </div>
    )
  }

  loadDropdownFieldStyle(category) {
    const { selectedCategory } = this.props;
    const { hover } = this.state;
    const style = styles.dropdownField;
    const isHighlighted = category === selectedCategory || category === hover;
    return isHighlighted ? {
      ...style,
      backgroundColor: "#e6f4ff",
      borderRight: "1px solid #dddddd"
    } : style;
  }

  toggleVisible(e) {
    e && e.stopPropagation();
    this.setState({ visible: !this.state.visible });
  }

  dismissDropdown() {
    return this.state.visible && this.toggleVisible();
  }

  onHover(category) {
    this.setState({ hover: category });
  }

  clearHover() {
    this.setState({ hover: '' });
  }
}

FilterCategoryDropdown.propTypes = {
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
    marginLeft: 3,
    marginRight: 12,
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
  }
};

export default FilterCategoryDropdown;

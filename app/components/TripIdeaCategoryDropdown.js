import React, { Component, PropTypes } from 'react';
import { categoryIcons, colors, IDEA_CATEGORY_PLACE } from 'app/constants';

class TripIdeaCategoryDropdown extends Component {
  componentDidMount() {
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
    const { onSelectCategory, selectedCategory } = this.props;
    const { visible } = this.state;
    const defaultCategory = IDEA_CATEGORY_PLACE;
    const defaultCategoryIcon = (
      <img src="../assets/place-idea-icon.png" style={styles.defaultIcon} />
    );

    const categoryDropdown = (
      <div style={styles.dropdown}>
        {Object.keys(categoryIcons).map(key => {
          return (
            <div
              key={key}
              onClick={onSelectCategory.bind(null, key)}
              onMouseOver={this.onHover.bind(this, key)}
              onMouseOut={this.clearHover.bind(this)}
              style={this.loadDropdownFieldStyle(key)}
            >
              <div style={styles.categoryFieldIcon}>
                {categoryIcons[key]}
              </div>
              <div style={styles.dropdownFieldLabel}>
                {key}
              </div>
            </div>
          );
        })}
        <div
          onClick={onSelectCategory.bind(null, defaultCategory)}
          onMouseOver={this.onHover.bind(this, defaultCategory)}
          onMouseOut={this.clearHover.bind(this)}
          style={this.loadDropdownFieldStyle(defaultCategory)}
        >
          {defaultCategoryIcon}
          <div style={styles.dropdownFieldLabel}>
            {IDEA_CATEGORY_PLACE}
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
          <div style={styles.categoryFieldIcon}>
            {categoryIcons[selectedCategory] || defaultCategoryIcon}
          </div>
          <div style={styles.categoryFieldLabel}>
            {selectedCategory}
          </div>
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
      backgroundColor: "#f2f2f2",
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

TripIdeaCategoryDropdown.propTypes = {
  onSelectCategory: PropTypes.func,
  selectedCategory: PropTypes.string.isRequired
};

const styles = {
  categoryField: {
    alignItems: "center",
    backgroundColor: colors.background,
    border: "1px solid #dddddd",
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    height: 30,
    padding: 5,
    position: "relative",
    width: 145
  },
  categoryFieldIcon: {
    fontSize: 16,
    marginRight: 12
  },
  categoryFieldLabel: {
    flexGrow: 1,
    fontSize: 13
  },
  defaultIcon: {
    height: 12,
    marginLeft: 3,
    marginRight: 12,
    width: 12
  },
  dropdown: {
    backgroundColor: "white",
    borderBottom: "1px solid #dddddd",
    borderRight: "1px solid #dddddd",
    boxShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    display: "flex",
    flexFlow: "column wrap",
    height: 121,
    position: "absolute",
    marginTop: 3,
    width: 260,
    zIndex: 1
  },
  dropdownField: {
    alignItems: "center",
    borderLeft: "1px solid #dddddd",
    borderTop: "1px solid #dddddd",
    cursor: "pointer",
    display: "flex",
    height: 30,
    padding: 5,
    width: 130
  },
  dropdownFieldLabel: {
    fontSize: 13
  }
};

export default TripIdeaCategoryDropdown;

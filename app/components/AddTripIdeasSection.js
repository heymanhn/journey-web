'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Textarea from 'react-textarea-autosize';
import {
  acComponents,
  colors,
  dimensions
} from 'app/constants';
import TripIdeaCategoryDropdown from './TripIdeaCategoryDropdown';
import TripIdeaLayout from './TripIdeaLayout';
import PlaceAutocomplete from 'app/containers/PlaceAutocomplete';

class AddTripIdeasSection extends Component {
  constructor(props) {
    super(props);

    this.state = { focused: false };
  }

  render() {
    const {
      newCategory,
      newIdea,
      onAddIdeaPress,
      onClearSavedPlace,
      onEnterIdeaComment,
      setCategory
    } = this.props;

    const categorySection = newIdea && (
      <div style={styles.categorySection}>
        <div style={styles.newIdeaSectionHeader}>CATEGORY</div>
        <TripIdeaCategoryDropdown
          onSelectCategory={setCategory}
          selectedCategory={newCategory}
        />
      </div>
    );

    const commentSection = newIdea && (
      <div style={styles.commentSection}>
        <div style={styles.newIdeaSectionHeader}>NOTE</div>
        <Textarea
          onBlur={this.clearFocus.bind(this)}
          onChange={onEnterIdeaComment}
          onFocus={this.setFocus.bind(this)}
          placeholder="Add a note"
          style={this.loadCommentFieldStyle()}
          tabIndex={2}
          type="text"
        />
      </div>
    );

    const newIdeaPreview = newIdea && (
      <div style={styles.newIdeaPreview}>
        <TripIdeaLayout idea={newIdea} showIcon={false} />
      </div>
    );

    const newIdeaButtons = newIdea && (
      <div style={styles.newIdeaButtonContainer}>
        <div style={styles.newIdeaButtons}>
          <Button
            onClick={onAddIdeaPress}
            style={styles.addButton}
            tabIndex={3}
          >
            <span>Add</span>
          </Button>
          <Button
            onClick={onClearSavedPlace}
            style={styles.cancelButton}
            tabIndex={4}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    );

    return (
      <div style={styles.addIdeasSection}>
        <PlaceAutocomplete
          autoFocus={!newIdea}
          id={acComponents.tripIdeaAC}
          placeholder="Enter a place or destination"
          style={styles.addIdeaSearchBox}
          tabIndex={1}
        />
        {newIdeaPreview}
        {newIdeaButtons}
        {categorySection}
        {commentSection}
      </div>
    );
  }

  loadCommentFieldStyle() {
    const style = styles.commentField;
    const { focused } = this.state;

    if (focused) {
      style.backgroundColor = "white";
      style.border = "1px solid #999999";
      style.outline = "none";
    } else {
      style.backgroundColor = colors.background;
      style.border = "1px solid #dddddd";
    }

    return style;
  }

  setFocus() {
    this.setState({ focused: true });
  }

  clearFocus() {
    this.setState({ focused: false });
  }
}

AddTripIdeasSection.propTypes = {
  newCategory: PropTypes.string,
  newIdea: PropTypes.object,
  onAddIdeaPress: PropTypes.func.isRequired,
  onClearSavedPlace: PropTypes.func.isRequired,
  onEnterIdea: PropTypes.func.isRequired,
  onEnterIdeaComment: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired
};

const styles = {
  addButton: {
    backgroundColor: colors.primary,
    border: 0,
    borderRadius: 25,
    color: "white",
    fontSize: 13,
    height: 25,
    marginRight: 5,
    padding: 0,
    width: 60
  },
  addIdeaSearchBox: {
    border: "1px solid #dddddd",
    borderRadius: 0,
    fontSize: 13,
    width: dimensions.leftColumn.width - (dimensions.sidePadding * 2)
  },
  addIdeasSection: {
    backgroundColor: "#eeeeee",
    borderTop: "1px solid #dddddd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 0px"
  },
  cancelButton: {
    border: "1px solid #dddddd",
    borderRadius: 25,
    color: colors.primaryText,
    fontSize: 13,
    height: 25,
    padding: 0,
    width: 70
  },
  categorySection: {
    alignSelf: "flex-start",
    margin: "0 " + dimensions.sidePadding
  },
  commentField: {
    color: colors.primaryText,
    fontSize: 13,
    minHeight: 60,
    padding: 10,
    resize: "none",
    width: dimensions.leftColumn.width - (dimensions.sidePadding * 2)
  },
  commentSection: {
    marginTop: 10
  },
  newIdeaButtonContainer: {
    height: 15,
    position: "relative",
    width: dimensions.leftColumn.width - (dimensions.sidePadding * 2)
  },
  newIdeaButtons: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: -13
  },
  newIdeaPreview: {
    borderBottom: "1px solid #ddd",
    borderTop: "1px solid #ddd",
    margin: "10px 0px 0px 30px",
    padding: "12px 30px 20px 0px",
    width: dimensions.leftColumn.width - dimensions.sidePadding
  },
  newIdeaSectionHeader: {
    fontSize: 10,
    paddingBottom: 3
  }
};

export default AddTripIdeasSection;

'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Textarea from 'react-textarea-autosize';
import TripIdeaCategoryDropdown from './TripIdeaCategoryDropdown';
import TripIdeaLayout from './TripIdeaLayout';
import { colors, dimensions } from 'app/constants';

class TripIdeaRow extends Component {
  constructor(props) {
    super(props);

    this.state = { focused: false };
  }

  render() {
    const {
      connectDropTarget,
      idea,
      isEditing,
      isViewOnly,
      newCategory,
      onEnterComment,
      onExitEditMode,
      onFocusIdea,
      onSetCategory,
      onUpdateIdea
    } = this.props;

    // Insert a dummy function if connectDropTarget is not specified
    const wrapperFn = connectDropTarget || (x => x);

    const contentSection = (
      <div><TripIdeaLayout idea={idea} showIcon={!isEditing} /></div>
    );

    const settingsSection = (
      <div>
        <div style={styles.categorySection}>
          <div style={styles.newIdeaSectionHeader}>CATEGORY</div>
          <TripIdeaCategoryDropdown
            onSelectCategory={onSetCategory}
            selectedCategory={newCategory || idea.category}
          />
        </div>
        <div style={styles.commentSection}>
          <div style={styles.newIdeaSectionHeader}>NOTE</div>
          <Textarea
            defaultValue={idea.comment}
            onBlur={this.clearFocus.bind(this)}
            onChange={onEnterComment}
            onFocus={this.setFocus.bind(this)}
            placeholder="Add a note"
            style={this.loadCommentFieldStyle()}
          />
        </div>
        <div style={styles.settingsButtons}>
          <Button
            onClick={onUpdateIdea}
            style={styles.doneButton}
            tabIndex={1}
          >
            <span>Done</span>
          </Button>
          <Button
            onClick={onExitEditMode}
            style={styles.cancelButton}
            tabIndex={2}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    );

    return (
      <div
        id={connectDropTarget ? idea._id : '__preview'}
        onClick={!isEditing && onFocusIdea}
        style={this.loadIdeaStyle()}
      >
        <div style={this.loadIdeaInfoStyle()}>
          {wrapperFn(contentSection)}
          {isEditing && settingsSection}
        </div>
      </div>
    );
  }

  loadIdeaStyle() {
    const { dragPreview, hover, isEditing, isViewOnly } = this.props;
    const { focused } = this.state;
    const {
      idea,
      ideaEditMode,
      ideaIfDraggable,
      ideaOnDrag,
      ideaOnHover
    } = styles;

    if (dragPreview) {
      return { ...idea, ...ideaOnDrag };
    }

    if (isEditing) {
      return { ...idea, ...ideaEditMode };
    }

    if (hover) {
      if (!isViewOnly) {
        return { ...idea, ...ideaOnHover, ...ideaIfDraggable };
      }

      return { ...idea, ...ideaOnHover };
    }

    return idea;
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

  loadIdeaInfoStyle() {
    const { hover, isEditing } = this.props;
    const { ideaInfo, ideaInfoOnHover } = styles;

    return hover || isEditing ? { ...ideaInfo, ...ideaInfoOnHover } : ideaInfo;
  }

  setFocus() {
    this.setState({ focused: true });
  }

  clearFocus() {
    this.setState({ focused: false });
  }
}

TripIdeaRow.propTypes = {
  connectDropTarget: PropTypes.func,
  dragPreview: PropTypes.bool,
  hover: PropTypes.bool,
  idea: PropTypes.object,
  isEditing: PropTypes.bool,
  isViewOnly: PropTypes.bool,
  newCategory: PropTypes.string,
  onEnterComment: PropTypes.func,
  onExitEditMode: PropTypes.func,
  onFocusIdea: PropTypes.func,
  onSetCategory: PropTypes.func,
  onUpdateIdea: PropTypes.func
};

const styles = {
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
    marginTop: 10
  },
  commentField: {
    color: colors.primaryText,
    fontSize: 13,
    marginBottom: 12,
    minHeight: 60,
    padding: 10,
    resize: "none",
    width: dimensions.leftColumn.width - (dimensions.sidePadding * 2)
  },
  commentSection: {
    marginTop: 10
  },
  doneButton: {
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
  idea: {
    borderBottom: "1px solid #ddd",
    margin: "0px 0px 0px 30px"
  },
  ideaEditMode: {
    borderBottom: "1px solid #dddddd",
    cursor: "default",
    margin: 0,
    padding: "0px 30px"
  },
  ideaIfDraggable: {
    cursor: "-webkit-grab"
  },
  ideaInfo: {
    padding: "12px 30px 12px 0px"
  },
  ideaInfoOnHover: {
    borderTop: "1px solid #dddddd",
    margin: "-1px -30px 0px",
    padding: "12px 30px"
  },
  ideaOnDrag: {
    backgroundColor: "#ffffff",
    border: "1px solid #dddddd",
    marginLeft: 0,
    paddingLeft: 30
  },
  ideaOnHover: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #dddddd",
    margin: 0,
    padding: "0px 30px",
    cursor: "pointer"
  },
  newIdeaSectionHeader: {
    fontSize: 10,
    paddingBottom: 3
  },
  settingsButtons: {
    display: "flex",
    justifyContent: "center",
    margin: "0px auto"
  }
};

export default TripIdeaRow;

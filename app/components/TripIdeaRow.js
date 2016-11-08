'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { colors, dimensions } from 'app/constants';

class TripIdeaRow extends Component {
  render() {
    const {
      connectDropTarget,
      idea,
      isEditing,
      isViewOnly,
      onEnterComment,
      onExitEditMode,
      onFocusIdea,
      onShowTripIdeaSettingsModal,
      onUpdateIdea
    } = this.props;

    // Insert a dummy function if connectDropTarget is not specified
    const wrapperFn = connectDropTarget || (x => x);
    const imageSection = (
      <div style={styles.photoSection}>
        <img src={idea.photo} style={styles.photo} />
      </div>
    );

    const infoSection = wrapperFn(
      <div style={styles.contentSection}>
        <div>
          <p style={styles.name}>{idea.name}</p>
          <p style={styles.address}>{idea.address}</p>
        </div>
        {idea.photo && imageSection}
      </div>
    );

    const settingsSection = (
      <div>
        <textarea
          defaultValue={idea.comment}
          onChange={onEnterComment}
          style={styles.textAreaField}
        />
        <div style={styles.settingsButtons}>
          <Button
            onClick={onUpdateIdea}
            style={{marginRight: 10}}
            tabIndex={1}
          >
            <span>Done</span>
          </Button>
          <Button
            onClick={onExitEditMode}
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
          {infoSection}
          {isEditing && settingsSection}
        </div>
      </div>
    );
  }

  loadIdeaStyle() {
    const { dragPreview, hover, isEditing, isViewOnly } = this.props;
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

    if (hover) {
      if (!isViewOnly) {
        return { ...idea, ...ideaOnHover, ...ideaIfDraggable };
      }

      return { ...idea, ...ideaOnHover };
    }

    if (isEditing) {
      return { ...idea, ...ideaEditMode };
    }

    return idea;
  }

  loadIdeaInfoStyle() {
    const { hover } = this.props;
    const { ideaInfo, ideaInfoOnHover } = styles;

    return hover ? { ...ideaInfo, ...ideaInfoOnHover } : ideaInfo;
  }
}

TripIdeaRow.propTypes = {
  connectDropTarget: PropTypes.func,
  dragPreview: PropTypes.bool,
  hover: PropTypes.bool,
  idea: PropTypes.object,
  isEditing: PropTypes.bool,
  isViewOnly: PropTypes.bool,
  onEnterComment: PropTypes.func,
  onExitEditMode: PropTypes.func,
  onFocusIdea: PropTypes.func,
  onShowTripIdeaSettingsModal: PropTypes.func,
  onUpdateIdea: PropTypes.func
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
  idea: {
    backgroundColor: colors.background,
    borderBottom: "1px solid #ddd",
    margin: "0px 0px 0px 30px"
  },
  ideaEditMode: {
    backgroundColor: "white"
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
  name: {
    fontSize: 14,
    fontWeight: "bold"
  },
  photo: {
    height: 60,
    objectFit: "cover",
    width: 60
  },
  photoSection: {
    border: "1px solid #eeeeee",
    height: 60,
    marginLeft: 10,
    width: 60
  },
  settingsButtons: {
    display: "flex",
    justifyContent: "center",
    margin: "0px auto"
  },
  textAreaField: {
    color: "#333333",
    fontSize: 13,
    height: 60,
    width: 340
  }
};

export default TripIdeaRow;

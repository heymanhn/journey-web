'use strict';

import React, { Component, PropTypes } from 'react';

class TripIdeaRow extends Component {
  render() {
    const {
      connectDropTarget,
      idea,
      isViewOnly,
      onFocusIdea,
      onShowTripIdeaSettingsModal
    } = this.props;

    // Insert a dummy function if connectDropTarget is not specified
    const wrapperFn = connectDropTarget || ((x) => { return x; });
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

    return (
      <div
        id={connectDropTarget ? idea._id : '__preview'}
        onClick={onFocusIdea}
        style={this.loadIdeaStyle()}
      >
        <div style={this.loadIdeaInfoStyle()}>
          {infoSection}
        </div>
      </div>
    );
  }

  loadIdeaStyle() {
    const { dragPreview, hover, isViewOnly } = this.props;
    const { idea, ideaIfDraggable, ideaOnDrag, ideaOnHover } = styles;

    if (dragPreview) {
      return { ...idea, ...ideaOnDrag };
    }

    if (hover) {
      if (!isViewOnly) {
        return { ...idea, ...ideaOnHover, ...ideaIfDraggable };
      }

      return { ...idea, ...ideaOnHover };
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
  isViewOnly: PropTypes.bool.isRequired,
  onFocusIdea: PropTypes.func,
  onShowTripIdeaSettingsModal: PropTypes.func
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
    backgroundColor: "#f9f9f9",
    borderBottom: "1px solid #ddd",
    margin: "0px 0px 0px 30px"
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
  }
};

export default TripIdeaRow;

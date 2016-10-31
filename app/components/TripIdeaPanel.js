'use strict';

import React, { Component, PropTypes } from 'react';
import { Image, Panel } from 'react-bootstrap';

class TripIdeaPanel extends Component {
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
    const imageSection = <Image src={idea.photo} style={styles.photo} />;
    const infoSection = wrapperFn(
      <div style={styles.info}>
        {idea.photo && imageSection}
        <p style={styles.name}>{idea.name}</p>
        <p style={styles.address}>{idea.address}</p>
      </div>
    );

    return (
      <Panel
        id={connectDropTarget ? idea._id : '__preview'}
        onClick={onFocusIdea}
        style={this.loadIdeaStyle()}
      >
        {infoSection}
        {idea.comment && (
          <p
            onClick={!isViewOnly ? onShowTripIdeaSettingsModal : null}
            style={styles.comment}
          >
            {idea.comment}
          </p>
        )}
      </Panel>
    );
  }

  loadIdeaStyle() {
    const { hover, isViewOnly } = this.props;
    const { idea, ideaIfDraggable, ideaOnHover } = styles;

    if (hover) {
      if (!isViewOnly) {
        return { ...idea, ...ideaOnHover, ...ideaIfDraggable };
      }

      return { ...idea, ...ideaOnHover };
    }

    return idea;
  }
}

TripIdeaPanel.propTypes = {
  connectDropTarget: PropTypes.func,
  hover: PropTypes.bool,
  idea: PropTypes.object,
  isViewOnly: PropTypes.bool.isRequired,
  onFocusIdea: PropTypes.func,
  onShowTripIdeaSettingsModal: PropTypes.func
};

const styles = {
  address: {
    fontSize: 12,
    color: "#999999"
  },
  comment: {
    cursor: "pointer",
    fontSize: 13,
    fontStyle: "italic",
    margin: "10px 0px 0px",
    wordWrap: "break-word"
  },
  idea: {
    backgroundColor: "#fdfdfd"
  },
  ideaIfDraggable: {
    cursor: "-webkit-grab"
  },
  ideaOnHover: {
    backgroundColor: "#f2f2f2",
    cursor: "pointer"
  },
  info: {
    minHeight: 100
  },
  name: {
    fontSize: 14,
    fontWeight: "bold"
  },
  photo: {
    float: "right",
    marginLeft: 10,
    width: "33%",
    height: 100,
    objectFit: "cover",
    border: "1px solid #eeeeee"
  }
};

export default TripIdeaPanel;

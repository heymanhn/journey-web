'use strict';

import _ from 'underscore';
import flow from 'lodash/flow';
import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon, Image, Panel } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import { dndTypes } from '../constants';

/*
 * React-dnd drag source
 */
const ideaSource = {
  beginDrag(props, monitor) {
    return {
      id: props.idea._id,
      index: props.index
    };
  }
};

function ideaSourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

/*
 * React-dnd drop target
 */
const ideaTarget = {
  drop(props, monitor) {
    const draggedIdea = monitor.getItem().id;
    const destIdea = props.idea._id;

    // Debug statement only for now
    console.log(`moved idea ${draggedIdea}
      to position of idea ${destIdea}`);
  },

  hover(props, monitor) {
    const { index, onReorderIdea } = props;
    const draggedIdea = monitor.getItem();

    if (draggedIdea.index === index) {
      return;
    }

    onReorderIdea(draggedIdea.index, index);

    // Update the drag source's index to maintain state
    draggedIdea.index = index;
  }
};

function ideaTargetCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class TripPageIdea extends Component {
  render() {
    const {
      connectDragSource,
      connectDropTarget,
      idea,
      index,
      isDragging,
      onRemoveIdea
    } = this.props;

    const infoSection = connectDropTarget(
      <div style={styles.info}>
        <Image src={idea.photo} style={styles.photo} />
        <p style={styles.name}>{idea.name}</p>
        <p style={styles.address}>{idea.address}</p>
        </div>
    );

    const fullIdeaSection = (
      <div>
        <div
          onClick={onRemoveIdea.bind(null, idea._id)}
          style={styles.removeButton.div}
        >
          <Glyphicon
            glyph="remove-circle"
            style={styles.removeButton.glyph}
          />
        </div>
        <Panel id={idea._id} style={styles.idea}>
          {infoSection}
          {idea.comment && (
            <div>
              <p style={styles.comment}>{idea.comment}</p>
            </div>
          )}
        </Panel>
      </div>
    );

    let ideaSection;
    if (isDragging) {
      ideaSection = connectDropTarget(
        <div id={idea._id} style={this.loadEmptyStyle()}/>
      );
    } else {
      ideaSection = fullIdeaSection;
    }

    return connectDragSource(ideaSection);
  }

  // Displays the grey placeholder box
  loadEmptyStyle() {
    const id = this.props.idea._id;
    const height = document.getElementById(id).clientHeight;
    return _.extend(styles.emptySpace, { height });
  }
}

TripPageIdea.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  idea: PropTypes.object,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  onRemoveIdea: PropTypes.func.isRequired,
  onReorderIdea: PropTypes.func.isRequired
};

const styles = {
  address: {
    fontSize: 12,
    color: '#999999'
  },
  comment: {
    fontStyle: 'italic',
    marginTop: 10
  },
  emptySpace: {
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    height: 80,
    marginBottom: 20
  },
  idea: {
    backgroundColor: '#fdfdfd',
    cursor: 'pointer'
  },
  info: {
    minHeight: 100
  },
  name: {
    fontWeight: 'bold'
  },
  photo: {
    float: 'right',
    marginLeft: 10,
    width: '33%',
    height: 100,
    objectFit: 'cover',
    border: '1px solid #eeeeee'
  },
  removeButton: {
    div: {
      backgroundColor: 'rgba(255,255,255,0.0)',
      cursor: 'pointer'
    },
    glyph: {
      borderRadius: 22,
      backgroundColor: '#ffffff',
      fontSize: 22,
      float: 'right',
      top: -8,
      left: 8
    }
  }
};

export default flow(
  DragSource(dndTypes.IDEA, ideaSource, ideaSourceCollect),
  DropTarget(dndTypes.IDEA, ideaTarget, ideaTargetCollect)
)(TripPageIdea);

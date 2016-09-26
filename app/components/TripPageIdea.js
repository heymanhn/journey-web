'use strict';

import _ from 'underscore';
import flow from 'lodash/flow';
import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import TripPageIdeaPanel from './TripPageIdeaPanel';
import { dndTypes } from '../constants';

/*
 * React-dnd drag source
 */
const ideaSource = {
  beginDrag(props, monitor) {
    return {
      id: props.idea._id,
      initialIndex: props.index,
      currentIndex: props.index
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

    const { index, onUpdateIdea } = props;
    const draggedIdea = monitor.getItem();

    if (draggedIdea.initialIndex === index) {
      return;
    }

    onUpdateIdea(index);
    draggedIdea.initialIndex = index;
  },

  hover(props, monitor) {
    const { index, onReorderIdea } = props;
    const draggedIdea = monitor.getItem();

    if (draggedIdea.currentIndex === index) {
      return;
    }

    onReorderIdea(draggedIdea.currentIndex, index);
    draggedIdea.currentIndex = index;
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
      isDragging,
      onRemoveIdea
    } = this.props;

    const ideaPanel = (
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
        <TripPageIdeaPanel
          {..._.pick(this.props, [
            'connectDropTarget',
            'idea'
          ])}
        />
      </div>
    );

    if (isDragging) {
      // Displays the grey placeholder box
      return compose(connectDragSource, connectDropTarget)(
        <div id={idea._id} style={this.loadEmptyStyle()}/>
      );
    } else {
      return connectDragSource(ideaPanel);
    }
  }

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
  onReorderIdea: PropTypes.func.isRequired,
  onUpdateIdea: PropTypes.func.isRequired
};

const styles = {
  emptySpace: {
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    height: 80,
    marginBottom: 20
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

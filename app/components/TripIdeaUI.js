'use strict';

import _ from 'underscore';
import flow from 'lodash/flow';
import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { compose } from 'redux';
import TripIdeaPanel from './TripIdeaPanel';
import { dndTypes, isMobile } from '../constants';

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
    connectDragPreview: connect.dragPreview(),
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

class TripIdeaUI extends Component {
  render() {
    const {
      connectDragPreview,
      connectDragSource,
      connectDropTarget,
      idea,
      isDragging,
      mouseOverIdea,
      onClearMouseOverIdea,
      onFocusIdea,
      onRemoveIdea,
      onSetMouseOverIdea
    } = this.props;

    const ideaPanel = (
      <div
        style={styles.mainDiv}

        /*
         * When the mouse hovers over an idea, dim the idea's background color
         * slightly and display a marker pin above the idea's location on the map to
         * indicate that that location is selected
         */
        onMouseOver={onSetMouseOverIdea.bind(null, idea._id)}
        onMouseLeave={onClearMouseOverIdea.bind(null, idea._id)}
      >
        <div
          onClick={onRemoveIdea.bind(null, idea._id)}
          style={styles.removeButton.div}
        >
          <Glyphicon
            glyph="remove-circle"
            style={styles.removeButton.glyph}
          />
        </div>
        <TripIdeaPanel
          {..._.pick(this.props, [
            'connectDropTarget',
            'idea'
          ])}
          hover={mouseOverIdea === idea._id}

          // Upon clicking on an idea, zoom in on the idea in the map
          onFocusIdea={onFocusIdea.bind(null, idea._id)}
        />
      </div>
    );

    let fullSection;
    if (isDragging) {
      // Displays the grey placeholder box
      fullSection = compose(connectDragSource, connectDropTarget)(
        <div id={idea._id} style={this.loadEmptyStyle()}/>
      );
    } else {
      fullSection = connectDragSource(ideaPanel);
    }

    // Only connect the drag preview if the touch backend is used
    if (isMobile) {
      fullSection = connectDragPreview(fullSection);
    }

    return fullSection;
  }

  loadEmptyStyle() {
    const id = this.props.idea._id;
    const height = document.getElementById(id).clientHeight;
    return _.extend(styles.emptySpace, { height });
  }
}

TripIdeaUI.propTypes = {
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  idea: PropTypes.object,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  mouseOverIdea: PropTypes.string.isRequired,
  onClearMouseOverIdea: PropTypes.func.isRequired,
  onFocusIdea: PropTypes.func.isRequired,
  onRemoveIdea: PropTypes.func.isRequired,
  onReorderIdea: PropTypes.func.isRequired,
  onSetMouseOverIdea: PropTypes.func.isRequired,
  onUpdateIdea: PropTypes.func.isRequired
};

const styles = {
  emptySpace: {
    backgroundColor: '#eeeeee',
    borderRadius: 4,
    height: 80,
    marginBottom: 20
  },
  mainDiv: {
    backgroundColor: '#ffffff'
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
)(TripIdeaUI);

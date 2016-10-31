'use strict';

import _ from 'underscore';
import flow from 'lodash/flow';
import React, { Component, PropTypes } from 'react';
import { Glyphicon } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { compose } from 'redux';
import TripIdeaPanel from './TripIdeaPanel';
import { dndTypes } from 'app/constants';

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

    onUpdateIdea();
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
  componentDidMount() {
    /*
     * Set an empty image as drag preview so that the user only sees the
     * custom drag layer
     */
    this.props.connectDragPreview(getEmptyImage(), {
      // IE fallback
      captureDraggingState: true
    });
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      idea,
      isDragging,
      isViewOnly,
      hoverLngLat,
      onClearHoverLngLat,
      onFocusIdea,
      onRemoveIdea
    } = this.props;

    const removeButton = (
      <div
        onClick={onRemoveIdea}
        style={this.loadRemoveButtonStyle()}
      >
        <Glyphicon
          glyph="remove-circle"
          style={styles.removeButton.glyph}
        />
      </div>
    );

    const ideaPanel = (
      <div
        style={styles.mainDiv}

        /*
         * When the mouse hovers over an idea, dim the idea's background color
         * slightly and display a marker pin above the idea's location on the map to
         * indicate that that location is selected
         */
        onMouseOver={this.setHoverLngLat.bind(this)}
        onMouseLeave={onClearHoverLngLat}
      >
        {!isViewOnly && removeButton}
        <TripIdeaPanel
          {..._.pick(this.props, [
            'connectDropTarget',
            'idea',
            'isViewOnly',
            'onShowTripIdeaSettingsModal'
          ])}
          hover={this.isHovering()}

          // Upon clicking on an idea, zoom in on the idea in the map
          onFocusIdea={onFocusIdea}
        />
      </div>
    );

    if (isViewOnly) {
      return ideaPanel;
    }

    if (isDragging) {
      // Displays the grey placeholder box
      return compose(connectDragSource, connectDropTarget)(
        <div id={idea._id} style={this.loadEmptyStyle()}/>
      );
    }

    return connectDragSource(ideaPanel);
  }

  loadEmptyStyle() {
    const id = this.props.idea._id;
    const height = document.getElementById(id).clientHeight;
    return _.extend(styles.emptySpace, { height });
  }

  loadRemoveButtonStyle() {
    const style = styles.removeButton.div;
    return this.isHovering() ? {...style, display: "block" } : style;
  }

  isHovering() {
    const { hoverLngLat, idea: { loc: { coordinates } } } = this.props;
    return hoverLngLat === coordinates;
  }

  setHoverLngLat() {
    const { hoverLngLat, idea, onSetHoverLngLat } = this.props;
    if (hoverLngLat !== idea.loc.coordinates) {
      return onSetHoverLngLat();
    }
  }
}

TripIdeaUI.propTypes = {
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  idea: PropTypes.object,
  index: PropTypes.number.isRequired,
  isDragging: PropTypes.bool.isRequired,
  isViewOnly: PropTypes.bool.isRequired,
  hoverLngLat: PropTypes.array,
  onClearHoverLngLat: PropTypes.func.isRequired,
  onFocusIdea: PropTypes.func.isRequired,
  onRemoveIdea: PropTypes.func.isRequired,
  onReorderIdea: PropTypes.func.isRequired,
  onSetHoverLngLat: PropTypes.func.isRequired,
  onUpdateIdea: PropTypes.func.isRequired,
  onShowTripIdeaSettingsModal: PropTypes.func.isRequired
};

const styles = {
  emptySpace: {
    backgroundColor: "#eeeeee",
    borderRadius: 4,
    height: 80,
    marginBottom: 20
  },
  mainDiv: {
    backgroundColor: "#ffffff"
  },
  removeButton: {
    div: {
      backgroundColor: "rgba(255,255,255,0.0)",
      cursor: "pointer",
      display: "none",
      position: "absolute",
      left: 356
    },
    glyph: {
      borderRadius: 22,
      backgroundColor: "#ffffff",
      fontSize: 22,
      top: -8
    }
  }
};

export default flow(
  DragSource(dndTypes.IDEA, ideaSource, ideaSourceCollect),
  DropTarget(dndTypes.IDEA, ideaTarget, ideaTargetCollect)
)(TripIdeaUI);

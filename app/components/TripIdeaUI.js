'use strict';

import _ from 'underscore';
import flow from 'lodash/flow';
import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { compose } from 'redux';
import TripIdeaRow from './TripIdeaRow';
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
      onEditIdea,
      onFocusIdea,
      onShowDeleteTripIdeaModal
    } = this.props;

    const hoverButtons = (
      <div style={this.loadHoverButtonsStyle()}>
        <div onClick={onEditIdea} style={styles.editButton}></div>
        <div
          onClick={onShowDeleteTripIdeaModal}
          style={styles.removeButton}
        ></div>
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
        <TripIdeaRow
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
        {!isViewOnly && hoverButtons}
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

  loadHoverButtonsStyle() {
    const style = styles.hoverButtons;
    return this.isHovering() ? { ...style, display: "flex" } : style;
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
  onEditIdea: PropTypes.func.isRequired,
  onFocusIdea: PropTypes.func.isRequired,
  onReorderIdea: PropTypes.func.isRequired,
  onSetHoverLngLat: PropTypes.func.isRequired,
  onShowDeleteTripIdeaModal: PropTypes.func.isRequired,
  onUpdateIdea: PropTypes.func.isRequired,
  onShowTripIdeaSettingsModal: PropTypes.func.isRequired
};

const styles = {
  editButton: {
    backgroundImage: "url('../assets/edit-idea-icon.png')",
    backgroundPosition: "9px 3px",
    backgroundRepeat: "no-repeat",
    borderRight: "1px solid #dddddd",
    cursor: "pointer",
    width: 30
  },
  emptySpace: {
    backgroundColor: "#eeeeee"
  },
  hoverButtons: {
    backgroundColor: "white",
    border: "1px solid #dddddd",
    borderRadius: 100,
    display: "none",
    height: 24,
    left: 170,
    marginTop: -18,
    position: "absolute",
    width: 60,
    zIndex: 1
  },
  mainDiv: {
    backgroundColor: "#f7f7f7",
    position: "relative"
  },
  removeButton: {
    backgroundImage: "url('../assets/delete-idea-icon.png')",
    backgroundPosition: "8px 6px",
    backgroundRepeat: "no-repeat",
    cursor: "pointer",
    width: 30
  }
};

export default flow(
  DragSource(dndTypes.IDEA, ideaSource, ideaSourceCollect),
  DropTarget(dndTypes.IDEA, ideaTarget, ideaTargetCollect)
)(TripIdeaUI);

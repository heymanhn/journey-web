'use strict';

import React, { Component, PropTypes } from 'react';
import { Image, Panel } from 'react-bootstrap';
import { DragLayer } from 'react-dnd';
import TripIdeaPanel from './TripIdeaPanel';

function collect(monitor) {
  return {
    currentOffset: monitor.getSourceClientOffset(),
    draggedIdea: monitor.getItem(),
    isDragging: monitor.isDragging()
  };
}

class TripIdeaDragPreview extends Component {
  render() {
    const {
      draggedIdea,
      ideas,
      isDragging
    } = this.props;

    if (!isDragging) {
      return <div></div>;
    }

    return (
      <div style={loadStyles(this.props)}>
        <TripIdeaPanel idea={ideas[draggedIdea.currentIndex]} />
      </div>
    );
  }
}

TripIdeaDragPreview.propTypes = {
  currentOffset: PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number
  }),
  draggedIdea: PropTypes.object,
  ideas: PropTypes.array,
  isDragging: PropTypes.bool.isRequired
};

function loadStyles(props) {
  const { draggedIdea, currentOffset } = props;

  if (!currentOffset) {
    return {
      display: 'none'
    };
  }

  const x = currentOffset.x;
  const y = currentOffset.y;

  const transform = `translate(${x}px, ${y}px)`;
  const draggedElem = document.getElementById(draggedIdea.id)

  return {
    position: "fixed",
    zIndex: 100,
    left: 0,
    top: 0,
    width: draggedElem.clientWidth,
    pointerEvents: "none",
    transform: transform,
    WebkitTransform: transform
  };
}

export default DragLayer(collect)(TripIdeaDragPreview);

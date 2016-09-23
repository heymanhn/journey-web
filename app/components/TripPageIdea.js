'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon, Image, Panel } from 'react-bootstrap';
import { DragSource } from 'react-dnd';
import { dndTypes } from '../constants';

/*
 * React-dnd setup
 */
const ideaSource = {
  beginDrag(props) {
    return { ideaId: props.idea._id };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class TripPageIdea extends Component {
  render() {
    const {
      connectDragSource,
      idea,
      isDragging,
      onRemoveIdea
    } = this.props;

    const commentSection = (
      <div>
        <p style={styles.comment}>{idea.comment}</p>
      </div>
    );

    let ideaSection;
    if (isDragging) {
      ideaSection = <div style={styles.emptySpace}/>;
    } else {
      ideaSection = (
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
          <Panel style={styles.idea}>
            <div style={styles.info}>
              <Image src={idea.photo} style={styles.photo} />
              <p style={styles.name}>{idea.name}</p>
              <p style={styles.address}>{idea.address}</p>
            </div>
            { idea.comment && commentSection }
          </Panel>
        </div>
      );
    }

    return connectDragSource(ideaSection);
  }
}

TripPageIdea.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  idea: PropTypes.object,
  isDragging: PropTypes.bool.isRequired,
  onRemoveIdea: PropTypes.func.isRequired
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
    height: 50,
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

export default DragSource(dndTypes.IDEA, ideaSource, collect)(TripPageIdea);

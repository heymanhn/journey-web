'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { Image, Panel } from 'react-bootstrap';

class TripIdeaPanel extends Component {
  render() {
    const {
      connectDropTarget,
      idea,
      onFocusIdea
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
        onClick={onFocusIdea}
        id={connectDropTarget ? idea._id : '__preview'}
        style={this.loadIdeaStyle()}
      >
        {infoSection}
        {idea.comment && (
          <div>
            <p style={styles.comment}>{idea.comment}</p>
          </div>
        )}
      </Panel>
    );
  }

  loadIdeaStyle() {
    const { hover } = this.props;
    const style = _.clone(styles.idea);
    return hover ? { ...style, backgroundColor: 'rgb(240, 240, 240)' } : style;
  }
}

TripIdeaPanel.propTypes = {
  connectDropTarget: PropTypes.func,
  hover: PropTypes.bool.isRequired,
  idea: PropTypes.object,
  onFocusIdea: PropTypes.func.isRequired
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
  idea: {
    backgroundColor: '#fdfdfd',
    cursor: 'pointer'
  },
  info: {
    minHeight: 100
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  photo: {
    float: 'right',
    marginLeft: 10,
    width: '33%',
    height: 100,
    objectFit: 'cover',
    border: '1px solid #eeeeee'
  }
};

export default TripIdeaPanel;

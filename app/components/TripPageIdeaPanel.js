'use strict';

import React, { Component, PropTypes } from 'react';
import { Image, Panel } from 'react-bootstrap';

class TripPageIdeaPanel extends Component {
  render() {
    const {
      connectDropTarget,
      idea
    } = this.props;

    // Insert a dummy function if connectDropTarget is not specified
    const wrapperFn = connectDropTarget || ((x) => { return x; });
    const infoSection = wrapperFn(
      <div style={styles.info}>
        <Image src={idea.photo} style={styles.photo} />
        <p style={styles.name}>{idea.name}</p>
        <p style={styles.address}>{idea.address}</p>
      </div>
    );

    return (
      <Panel id={idea._id} style={styles.idea}>
        {infoSection}
        {idea.comment && (
          <div>
            <p style={styles.comment}>{idea.comment}</p>
          </div>
        )}
      </Panel>
    );
  }
}

TripPageIdeaPanel.propTypes = {
  connectDropTarget: PropTypes.func,
  idea: PropTypes.object
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

export default TripPageIdeaPanel;

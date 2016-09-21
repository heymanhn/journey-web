'use strict';

import React, { Component, PropTypes } from 'react';
import { Button, Glyphicon, Image, Panel } from 'react-bootstrap';
import { tripPageIdeaStyles as styles } from '../stylesheets/styles';

class TripPageIdea extends Component {
  render() {
    const { idea } = this.props;
    const commentSection = (
      <div>
        <p style={styles.comment}>{idea.comment}</p>
      </div>
    );

    return (
      <div>
        <div style={styles.removeButton.div}>
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
}

TripPageIdea.propTypes = {
  idea: PropTypes.object
};

export default TripPageIdea;

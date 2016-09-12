'use strict';

import React, { Component, PropTypes } from 'react';
import TripPageIdea from './TripPageIdea';

class TripPageIdeasList extends Component {
  render() {
    const { ideas } = this.props;
    const tripIdeas = ideas.map(idea => {
      return <TripPageIdea key={idea._id} idea={idea} />;
    });

    return (
      <div>
        <h3>Ideas</h3>
        {tripIdeas}
      </div>
    );
  }
}

TripPageIdeasList.propTypes = {
  ideas: PropTypes.array
};

export default TripPageIdeasList;

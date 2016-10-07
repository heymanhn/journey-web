'use strict';

require('app/stylesheets/tripIdeasList.css');

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'react-bootstrap';

import { colors, isMobile } from 'app/constants';
import TripIdeaDragPreview from './TripIdeaDragPreview';
import TextInput from './TextInput';
import TripIdea from 'app/containers/TripIdea';

class TripIdeasList extends Component {
  componentDidMount() {
    this.loadGoogleAutocompleteAPI();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.newIdea) {
      findDOMNode(this.searchBox).value = '';
    }
  }

  render() {
    const {
      ideas,
      newIdea,
      onAddIdeaPress,
      onEnterIdeaComment
    } = this.props;

    const tripIdeas = ideas.map((idea, index) => {
      return <TripIdea key={idea._id} idea={idea} index={index} />;
    });

    const commentBox = (
      <TextInput
        type="text"
        placeholder="Add a comment"
        style={styles.commentBox}
        onChange={onEnterIdeaComment}
      />
    );

    const dragPreview = (
      <TripIdeaDragPreview ideas={ideas} key="__preview" />
    );

    return (
      <div>
        <div style={styles.inputSection}>
          <h3>Ideas</h3>
          <TextInput
            ref={x => this.searchBox = x}
            type="text"
            placeholder="Enter a place or destination"
            style={styles.searchBox}
          />
          <Button
            onClick={onAddIdeaPress}
            disabled={!newIdea}
            style={this.loadAddIdeaButtonStyle()}
          >
            Add
          </Button>
          {newIdea && commentBox}
        </div>
        <div>
          {tripIdeas}
          {isMobile && dragPreview}
        </div>
      </div>
    );
  }

  // API documentation: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
  loadGoogleAutocompleteAPI() {
    const { onEnterIdea, destination } = this.props;
    const { northeast, southwest } = destination.viewport;
    const google = window.google;

    /*
     * Initiate the Google Maps Javascript API with the bounds set to the trip's
     * destination viewport.
     */
    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(
        southwest.coordinates[1],
        southwest.coordinates[0]
      ),
      new google.maps.LatLng(
        northeast.coordinates[1],
        northeast.coordinates[0]
      )
    );

    const options = {
      bounds,
      types: ['geocode', 'establishment']
    };
    const input = findDOMNode(this.searchBox);
    const ac = new google.maps.places.Autocomplete(input, options);
    ac.addListener('place_changed', () => onEnterIdea(ac.getPlace()));
  }

  loadAddIdeaButtonStyle() {
    let style = styles.searchBoxButton;
    const disabledStyle = styles.searchBoxButtonDisabled;
    const { newIdea } = this.props;

    return newIdea ? style : {...style, ...disabledStyle};
  }
}

TripIdeasList.propTypes = {
  destination: PropTypes.object,
  ideas: PropTypes.array,
  newIdea: PropTypes.object,
  onAddIdeaPress: PropTypes.func.isRequired,
  onEnterIdea: PropTypes.func.isRequired,
  onEnterIdeaComment: PropTypes.func.isRequired
};

const styles = {
  commentBox: {
    display: "inline",
    width: "100%",
    marginBottom: 10
  },
  inputSection: {
    marginBottom: 10
  },
  searchBox: {
    display: "inline",
    width: "80%",
    marginBottom: 10
  },
  searchBoxButton: {
    backgroundColor: colors.primary,
    border: "none",
    color: "white",
    float: "right"
  },
  searchBoxButtonDisabled: {
    backgroundColor: "#f3f3f3",
    border: "1px solid #e1e1e1",
    color: "#cccccc",
    cursor: "default"
  }
};

export default TripIdeasList;

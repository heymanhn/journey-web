'use strict';

require('app/stylesheets/tripIdeasList.css');

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'react-bootstrap';

import { colors } from 'app/constants';
import TripIdeaDragPreview from './TripIdeaDragPreview';
import TextInput from './TextInput';
import TripIdea from 'app/containers/TripIdea';

class TripIdeasList extends Component {
  componentDidMount() {
    this.loadGoogleAutocompleteAPI();
  }

  render() {
    const {
      ideas,
      newIdea,
      onAddIdeaPress,
      onEnterIdeaComment,
      onShowAllIdeas
    } = this.props;

    const tripIdeas = ideas.map((idea, index) => {
      return <TripIdea key={idea._id} idea={idea} index={index} />;
    });

    const commentBox = (
      <TextInput
        onChange={onEnterIdeaComment}
        placeholder="Add a comment"
        style={styles.commentBox}
        tabIndex={2}
        type="text"
      />
    );

    const dragPreview = (
      <TripIdeaDragPreview ideas={ideas} key="__preview" />
    );

    return (
      <div>
        <div style={styles.inputSection}>
          <div style={styles.titleSection}>
            <h3>Ideas</h3>
            {ideas.length > 0 && (
              <span
                onClick={onShowAllIdeas}
                style={styles.showAllLink}
              >
                Show all
              </span>
            )}
          </div>
          <TextInput
            onBlur={this.unlockLeftColumnScroll}
            onChange={this.handleSearchBoxChange.bind(this)}
            onKeyDown={this.handleSearchBoxKeys.bind(this)}
            ref={x => this.searchBox = x}
            type="text"
            placeholder="Enter a place or destination"
            style={styles.searchBox}
            tabIndex={1}
          />
          <Button
            disabled={!newIdea}
            onClick={this.clearSearchBoxAnd.bind(this, onAddIdeaPress)}
            style={this.loadAddIdeaButtonStyle()}
            tabIndex={3}
          >
            Add
          </Button>
          {newIdea && commentBox}
        </div>
        <div>
          {tripIdeas}
          {dragPreview}
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
    ac.addListener('place_changed', () => {
      const place = ac.getPlace();
      return place.place_id && onEnterIdea(place);
    });
  }

  loadAddIdeaButtonStyle() {
    let style = styles.searchBoxButton;
    const disabledStyle = styles.searchBoxButtonDisabled;
    const { newIdea } = this.props;

    return newIdea ? style : {...style, ...disabledStyle};
  }

  handleSearchBoxChange() {
    const { newIdea, onClearTripIdea } = this.props;
    newIdea && onClearTripIdea();

    if (findDOMNode(this.searchBox).value) {
      this.lockLeftColumnScroll();
    }
  }

  handleSearchBoxKeys(event) {
    const { newIdea, onAddIdeaPress, onClearTripIdea } = this.props;

    switch(event.key) {
      case 'Enter':
        newIdea && this.clearSearchBoxAnd(onAddIdeaPress);
        return this.unlockLeftColumnScroll();
      case 'Backspace':
      case 'Escape':
        newIdea && this.clearSearchBoxAnd(onClearTripIdea);
        return this.unlockLeftColumnScroll();
    }
  }

  clearSearchBoxAnd(next) {
    findDOMNode(this.searchBox).value = '';
    return next && next();
  }

  unlockLeftColumnScroll() {
    document.getElementById('leftColumn').style.overflow = "scroll";
  }

  lockLeftColumnScroll() {
    const style = document.getElementById('leftColumn').style;
    if (style.overflow === 'scroll') {
      style.overflow = 'hidden';
    }
  }
}

TripIdeasList.propTypes = {
  destination: PropTypes.object,
  ideas: PropTypes.array,
  newIdea: PropTypes.object,
  onAddIdeaPress: PropTypes.func.isRequired,
  onClearTripIdea: PropTypes.func.isRequired,
  onEnterIdea: PropTypes.func.isRequired,
  onEnterIdeaComment: PropTypes.func.isRequired,
  onShowAllIdeas: PropTypes.func.isRequired
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
  },
  showAllLink: {
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  titleSection: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between'
  }
};

export default TripIdeasList;

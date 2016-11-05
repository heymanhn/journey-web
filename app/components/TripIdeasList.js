'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'react-bootstrap';

import { acComponents, colors, dimensions } from 'app/constants';
import TripIdeaDragPreview from './TripIdeaDragPreview';
import TextInput from './TextInput';
import TripIdea from 'app/containers/TripIdea';
import PlaceAutocomplete from 'app/containers/PlaceAutocomplete';

class TripIdeasList extends Component {
  render() {
    const {
      ideas,
      isViewOnly,
      newIdea,
      onAddIdeaPress,
      onEnterIdeaComment,
      onShowAllIdeas
    } = this.props;

    const tripIdeas = ideas.map((idea, index) => {
      return (
        <TripIdea
          idea={idea}
          index={index}
          isViewOnly={isViewOnly}
          key={idea._id}
        />
      );
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

    const showAllIdeasLink = (
      <div
        onClick={onShowAllIdeas}
        style={styles.showAllLink}
      >
        Show all ideas on map
      </div>
    );

    const dragPreview = (
      <TripIdeaDragPreview ideas={ideas} key="__preview" />
    );

    const addIdeaSection = (
      <div>
        <div style={styles.searchSection}>
          <PlaceAutocomplete
            id={acComponents.tripIdeaAC}
            placeholder="Enter a place or destination"
            style={styles.searchBox}
            tabIndex={1}
          />
          <Button
            disabled={!newIdea}
            onClick={onAddIdeaPress}
            style={this.loadAddIdeaButtonStyle()}
            tabIndex={3}
          >
            Add
          </Button>
        </div>
        {newIdea && commentBox}
      </div>
    );

    return (
      <div style={styles.ideasSection}>
        <div style={styles.inputSection}>
          <div style={styles.titleSection}>
            <h3 style={styles.h3}>Ideas</h3>
          </div>
          {!isViewOnly && addIdeaSection}
        </div>
        <div>
          {tripIdeas}
          {ideas.length > 0 && showAllIdeasLink}
          {!isViewOnly && dragPreview}
        </div>
      </div>
    );
  }

  loadAddIdeaButtonStyle() {
    let style = styles.searchBoxButton;
    const disabledStyle = styles.searchBoxButtonDisabled;
    const { newIdea } = this.props;

    return newIdea ? style : { ...style, ...disabledStyle };
  }
}

TripIdeasList.propTypes = {
  ideas: PropTypes.array,
  isViewOnly: PropTypes.bool.isRequired,
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
    margin: "0px 0px 10px 0px",
    width: "100%"
  },
  h3: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 400,
    marginTop: 10
  },
  ideasSection: {
    padding: "0 " + dimensions.sidePadding + " 0"
  },
  inputSection: {
    marginBottom: 10
  },
  searchBox: {
    fontSize: 14,
    width: 280
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
  searchSection: {
    alignItems: "baseline",
    display: "flex",
    justifyContent: "space-between",
    margin: "0px 0px 10px 0px"
  },
  showAllLink: {
    cursor: "pointer",
    backgroundColor: "#f4f4f4",
    border: "1px solid #dddddd",
    borderRadius: 3,
    margin: "10px auto",
    textAlign: "center",
    padding: 10
  },
  titleSection: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between"
  }
};

export default TripIdeasList;

'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'react-bootstrap';

import { acComponents, colors, dimensions } from 'app/constants';
import DeleteModal from './DeleteModal';
import TextInput from './TextInput';
import TripIdea from 'app/containers/TripIdea';
import TripIdeaDragPreview from './TripIdeaDragPreview';
import PlaceAutocomplete from 'app/containers/PlaceAutocomplete';

class TripIdeasList extends Component {
  render() {
    const {
      error,
      ideas,
      isFetching,
      isViewOnly,
      newIdea,
      onAddIdeaPress,
      onDeleteTripIdea,
      onEnterIdeaComment,
      onHide,
      onShowAllIdeas,
      showModal
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
      <div style={styles.footerSection}>
        <div
          onClick={onShowAllIdeas}
          style={styles.showAllLink}
        >
          Show all ideas on map
        </div>
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
      <div>
        <div style={styles.titleSection}>
          <h3 style={styles.h3}>Ideas</h3>
        </div>
        <div>
          <div style={styles.ideasSection}>
            {tripIdeas}
            <DeleteModal
              contentTitle={this.getTripIdeaNameToDelete()}
              error={error}
              isFetching={isFetching}
              modalTitle="Delete Trip Idea"
              onHide={onHide}
              onDelete={onDeleteTripIdea}
              showModal={showModal}
            />
          </div>
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

  getTripIdeaNameToDelete() {
    const { ideas, tripIdeaToDelete } = this.props;

    if (!tripIdeaToDelete) {
      return null;
    }

    const idea = ideas.find(i => i._id === tripIdeaToDelete);
    return idea ? idea.name : '';
  }
}

TripIdeasList.propTypes = {
  error: PropTypes.string,
  ideas: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  isViewOnly: PropTypes.bool.isRequired,
  newIdea: PropTypes.object,
  onAddIdeaPress: PropTypes.func.isRequired,
  onClearTripIdea: PropTypes.func.isRequired,
  onDeleteTripIdea: PropTypes.func.isRequired,
  onEnterIdea: PropTypes.func.isRequired,
  onEnterIdeaComment: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onShowAllIdeas: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  tripIdeaToDelete: PropTypes.string
};

const styles = {
  commentBox: {
    display: "inline",
    margin: "0px 0px 10px 0px",
    width: "100%"
  },
  footerSection: {
    backgroundColor: colors.background,
    padding: "20px 0px 10px"
  },
  h3: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: 22,
    fontWeight: 400,
    marginTop: 10,
    marginBottom: 0
  },
  ideasSection: {
    backgroundColor: colors.background,
    borderTop: "1px solid #dddddd"
  },
  inputSection: {
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
    color: "white",
    cursor: "pointer",
    backgroundColor: colors.secondary,
    borderRadius: 25,
    fontSize: 13,
    margin: "0px auto",
    padding: 8,
    textAlign: "center",
    width: 180
  },
  titleSection: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 0,
    padding: "0 " + dimensions.sidePadding + " 10"
  }
};

export default TripIdeasList;

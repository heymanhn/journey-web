'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'react-bootstrap';
import {
  acComponents,
  colors,
  dimensions,
  dropdownComponents
} from 'app/constants';
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
      onShowDropdown,
      onDeleteTripIdea,
      onEnterIdeaComment,
      onHide,
      onShowAllIdeas,
      showDropdown,
      showModal
    } = this.props;
    const { addTripIdeas } = dropdownComponents;

    const addIdeasDropdownButton = (
      <div style={styles.addIdeaDropdownButton}>
        <img
          onClick={onShowDropdown.bind(null, addTripIdeas)}
          src="../assets/add-idea-button.png"
          style={styles.addIdeaDropdownButtonIcon}
        />
        {showDropdown && <div style={this.loadActiveDropdownStyle()}></div>}
      </div>
    );

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

    const addIdeasDropdown = (
      <div style={styles.addIdeasSection}>
        <PlaceAutocomplete
          id={acComponents.tripIdeaAC}
          placeholder="Enter a place or destination"
          style={styles.addIdeaSearchBox}
          tabIndex={1}
        />
      </div>
    );

    return (
      <div>
        <div style={styles.titleSection}>
          <h3 style={styles.h3}>Ideas</h3>
          {!isViewOnly && addIdeasDropdownButton}
        </div>
        <div>
          {showDropdown && addIdeasDropdown}
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

  loadActiveDropdownStyle() {
    const { showDropdown } = this.props;
    const style = styles.activeDropdown;
    return showDropdown ? { ...style, display: "block" } : style;
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
  onShowDropdown: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  tripIdeaToDelete: PropTypes.string
};

const styles = {
  activeDropdown: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    display: "none",
    height: 4,
    position: "absolute",
    marginTop: 5,
    width: 25
  },
  addIdeaDropdownButton: {
    marginLeft: 20,
    position: "relative",
    textAlign: "center",
    width: 25
  },
  addIdeaDropdownButtonIcon: {
    cursor: "pointer"
  },
  addIdeaSearchBox: {
    border: "1px solid #dddddd",
    borderRadius: 0,
    fontSize: 13,
    width: 340
  },
  addIdeasSection: {
    backgroundColor: "#eeeeee",
    borderTop: "1px solid #dddddd",
    display: "flex",
    justifyContent: "center",
    padding: "12px 0px"
  },
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
    margin: "10px 0px 0px",
    position: "relative",
    top: 5
  },
  ideasSection: {
    backgroundColor: colors.background,
    borderTop: "1px solid #dddddd"
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
    backgroundColor: "white",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: 0,
    padding: "8px " + dimensions.sidePadding + "px 10px"
  }
};

export default TripIdeasList;

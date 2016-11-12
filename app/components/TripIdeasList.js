'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Textarea from 'react-textarea-autosize';
import {
  acComponents,
  colors,
  dimensions,
  dropdownComponents
} from 'app/constants';
import DeleteModal from './DeleteModal';
import TripIdea from 'app/containers/TripIdea';
import TripIdeaDragPreview from './TripIdeaDragPreview';
import TripIdeaLayout from './TripIdeaLayout';
import PlaceAutocomplete from 'app/containers/PlaceAutocomplete';

class TripIdeasList extends Component {
  constructor(props) {
    super(props);

    this.state = { focused: false };
  }

  render() {
    const {
      error,
      ideas,
      isFetching,
      isViewOnly,
      newIdea,
      onAddIdeaPress,
      onClearSavedPlace,
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

    const commentField = newIdea && (
      <Textarea
        onBlur={this.clearFocus.bind(this)}
        onChange={onEnterIdeaComment}
        onFocus={this.setFocus.bind(this)}
        placeholder="Add a note"
        style={this.loadCommentFieldStyle()}
        tabIndex={2}
        type="text"
      />
    );

    const newIdeaPreview = newIdea && (
      <div style={styles.newIdeaPreview}>
        <TripIdeaLayout idea={newIdea} />
      </div>
    );

    const newIdeaButtons = newIdea && (
      <div style={styles.newIdeaButtonContainer}>
        <div style={styles.newIdeaButtons}>
          <Button
            onClick={onAddIdeaPress}
            style={styles.addButton}
            tabIndex={3}
          >
            <span>Add</span>
          </Button>
          <Button
            onClick={onClearSavedPlace}
            style={styles.cancelButton}
            tabIndex={4}
          >
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    );

    const addIdeasDropdown = (
      <div style={styles.addIdeasSection}>
        <PlaceAutocomplete
          autoFocus={showDropdown && !newIdea}
          id={acComponents.tripIdeaAC}
          placeholder="Enter a place or destination"
          style={styles.addIdeaSearchBox}
          tabIndex={1}
        />
        {newIdeaPreview}
        {newIdeaButtons}
        {commentField}
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

  loadActiveDropdownStyle() {
    const { showDropdown } = this.props;
    const style = styles.activeDropdown;
    return showDropdown ? { ...style, display: "block" } : style;
  }

  loadCommentFieldStyle() {
    const style = styles.commentField;
    const { focused } = this.state;

    if (focused) {
      style.backgroundColor = "white";
      style.border = "1px solid #999999";
      style.outline = "none";
    } else {
      style.backgroundColor = colors.background;
      style.border = "1px solid #dddddd";
    }

    return style;
  }

  getTripIdeaNameToDelete() {
    const { ideas, tripIdeaToDelete } = this.props;

    if (!tripIdeaToDelete) {
      return null;
    }

    const idea = ideas.find(i => i._id === tripIdeaToDelete);
    return idea ? idea.name : '';
  }

  setFocus() {
    this.setState({ focused: true });
  }

  clearFocus() {
    this.setState({ focused: false });
  }
}

TripIdeasList.propTypes = {
  error: PropTypes.string,
  ideas: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  isViewOnly: PropTypes.bool.isRequired,
  newIdea: PropTypes.object,
  onAddIdeaPress: PropTypes.func.isRequired,
  onClearSavedPlace: PropTypes.func.isRequired,
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
  addButton: {
    backgroundColor: colors.primary,
    border: 0,
    borderRadius: 25,
    color: "white",
    fontSize: 13,
    height: 25,
    marginRight: 5,
    padding: 0,
    width: 60
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
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 0px"
  },
  cancelButton: {
    border: "1px solid #dddddd",
    borderRadius: 25,
    color: colors.primaryText,
    fontSize: 13,
    height: 25,
    padding: 0,
    width: 70
  },
  commentField: {
    color: colors.primaryText,
    fontSize: 13,
    marginTop: 10,
    minHeight: 60,
    padding: 10,
    resize: "none",
    width: 340
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
  newIdeaButtonContainer: {
    height: 15,
    position: "relative",
    width: dimensions.leftColumn.width - 60
  },
  newIdeaButtons: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    top: -13
  },
  newIdeaPreview: {
    borderBottom: "1px solid #ddd",
    borderTop: "1px solid #ddd",
    margin: "10px 0px 0px 30px",
    padding: "12px 30px 20px 0px",
    width: dimensions.leftColumn.width - 30
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

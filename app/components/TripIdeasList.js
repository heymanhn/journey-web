'use strict';

import _ from 'underscore';
import React, { Component, PropTypes } from 'react';
import {
  colors,
  dimensions,
  dropdownComponents
} from 'app/constants';
import AddTripIdeas from 'app/containers/AddTripIdeas';
import DeleteModal from './DeleteModal';
import TripIdea from 'app/containers/TripIdea';
import TripIdeaDragPreview from './TripIdeaDragPreview';

class TripIdeasList extends Component {
  render() {
    const {
      error,
      ideas,
      isFetching,
      isViewOnly,
      onShowDropdown,
      onDeleteTripIdea,
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
          {showDropdown && <AddTripIdeas />}
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
  onDeleteTripIdea: PropTypes.func.isRequired,
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
    marginLeft: 15,
    textAlign: "center",
    width: 25
  },
  addIdeaDropdownButtonIcon: {
    cursor: "pointer"
  },
  footerSection: {
    backgroundColor: colors.background,
    padding: "20px 0px 10px"
  },
  h3: {
    flexGrow: 1,
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

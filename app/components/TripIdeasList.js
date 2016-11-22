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
import FilterTripIdeas from 'app/containers/FilterTripIdeas';
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
      showAddIdeasDropdown,
      showFilterIdeasDropdown,
      showModal,
      totalIdeas
    } = this.props;
    const { addTripIdeas, filterTripIdeas } = dropdownComponents;

    const filterIdeasDropdownButton = (
      <div style={styles.filterIdeasDropdownButton}>
        <img
          onClick={onShowDropdown.bind(null, filterTripIdeas)}
          src="../assets/filter-button.png"
          style={styles.filterIdeasDropdownButtonIcon}
        />
        {showFilterIdeasDropdown && <div style={styles.activeDropdown}></div>}
      </div>
    );

    const addIdeasDropdownButton = (
      <div style={styles.addIdeaDropdownButton}>
        <img
          onClick={onShowDropdown.bind(null, addTripIdeas)}
          src="../assets/add-idea-button.png"
          style={styles.addIdeaDropdownButtonIcon}
        />
        {showAddIdeasDropdown && <div style={styles.activeDropdown}></div>}
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
          Show all {totalIdeas > 1 && totalIdeas} ideas
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
          {filterIdeasDropdownButton}
          {!isViewOnly && addIdeasDropdownButton}
        </div>
        <div>
          {showFilterIdeasDropdown && <FilterTripIdeas />}
          {showAddIdeasDropdown && <AddTripIdeas />}
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
          {totalIdeas > 0 && showAllIdeasLink}
          {!isViewOnly && dragPreview}
        </div>
      </div>
    );
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
  totalIdeas: PropTypes.number,
  tripIdeaToDelete: PropTypes.string
};

const styles = {
  activeDropdown: {
    backgroundColor: colors.primary,
    borderRadius: 25,
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
  filterIdeasDropdownButton: {
    position: "relative",
    top: 2,
    width: 25
  },
  filterIdeasDropdownButtonIcon: {
    cursor: "pointer",
    marginBottom: 1
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
    width: 160
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

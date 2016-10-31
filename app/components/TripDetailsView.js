'use strict';

import React, { Component, PropTypes } from 'react';
import TripSetting from './TripSetting';
import { dimensions } from 'app/constants';

class TripDetailsView extends Component {
  render() {
    const {
      isFetchingVisibility,
      onShowDestination,
      onShowTripSettingsModal,
      onToggleTripVisibility,
      trip
    } = this.props;
    const { destination, title, visibility: vis } = trip;

    let visibilityTitle;
    switch (vis) {
      case 'public':
        visibilityTitle = 'Public';
        break;
      case 'viewOnly':
        visibilityTitle = 'View Only';
        break;
      case 'private':
        visibilityTitle = 'Private';
        break;
    }

    return (
      <div>
        <h1 style={styles.h1}>{title}</h1>
        <div style={styles.settingsSection}>
          <TripSetting
            onClick={onShowDestination}
            setting="destination"
            title={destination.name}
          />
          <TripSetting
            isLoading={isFetchingVisibility}
            onClick={onToggleTripVisibility.bind(null, vis)}
            setting="visibility"
            title={visibilityTitle}
          />
          <TripSetting
            last
            onClick={onShowTripSettingsModal}
            setting="edit"
            title="Edit"
          />
        </div>
      </div>
    );
  }
}

TripDetailsView.propTypes = {
  isFetchingVisibility: PropTypes.bool.isRequired,
  onSetTripVisibility: PropTypes.func.isRequired,
  onShowDestination: PropTypes.func.isRequired,
  onShowTripSettingsModal: PropTypes.func.isRequired,
  onToggleTripVisibility: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};

const styles = {
  h1: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: 36,
    fontWeight: 300,
    margin: "0px " + dimensions.sidePadding + "px",
    paddingTop: 35,
    wordWrap: "break-word"
  },
  settingsSection: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    margin: "10px 20px"
  }
};

export default TripDetailsView;

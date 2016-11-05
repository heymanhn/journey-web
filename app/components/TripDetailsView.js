'use strict';

import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import TripSetting from './TripSetting';
import { colors, dimensions } from 'app/constants';

class TripDetailsView extends Component {
  render() {
    const {
      isFetchingVisibility,
      isTripOwner,
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

    const visibilitySetting = (
      <TripSetting
        isDisabled={!isTripOwner}
        last={!isTripOwner}
        isLoading={isFetchingVisibility}
        onClick={onToggleTripVisibility.bind(null, vis)}
        setting="visibility"
        title={visibilityTitle}
      />
    );

    const unauthorizedTooltip = (
      <Tooltip id="unauthorized-tooltip" style={styles.tooltip}>
        Only trip owners can change this setting.
      </Tooltip>
    );

    const visibilitySettingWithTooltip = (
      <OverlayTrigger
        overlay={unauthorizedTooltip}
        placement="bottom"
        rootClose
        trigger="click"
      >
        <div>{visibilitySetting}</div>
      </OverlayTrigger>
    );

    return (
      <div>
        <h1 style={styles.h1}>{title}</h1>
        <div style={styles.settingsSection}>
          <TripSetting
            onClick={onShowDestination}
            setting="destination"
            title={destination.name}
          />

          {isTripOwner ? visibilitySetting : visibilitySettingWithTooltip}

          {isTripOwner && (
            <TripSetting
              last={isTripOwner}
              onClick={onShowTripSettingsModal}
              setting="edit"
              title="Edit"
            />
          )}
        </div>
      </div>
    );
  }
}

TripDetailsView.propTypes = {
  isFetchingVisibility: PropTypes.bool.isRequired,
  isTripOwner: PropTypes.bool,
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
    paddingTop: 26,
    wordWrap: "break-word"
  },
  settingsSection: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    margin: "8px 20px"
  },
  tooltip: {
    marginTop: -7,
    width: 150
  }
};

export default TripDetailsView;

'use strict';

import React, { Component, PropTypes } from 'react';
import TripSetting from './TripSetting';
import { dimensions } from 'app/constants';

class TripDetailsView extends Component {
  render() {
    const { onShowDestination, trip } = this.props;
    const { destination, title, visibility: vis } = trip;
    const camelVis = vis[0].toUpperCase() + vis.substring(1);

    return (
      <div style={styles.titleSection}>
        <h1 style={styles.h1}>{title}</h1>
        <div style={styles.settingsSection}>
          <TripSetting
            onClick={onShowDestination}
            title={destination.name}
            setting="destination"
          />
          <TripSetting
            onClick={this.toggleVisibility.bind(this)}
            title={camelVis} setting="visibility" />
          <TripSetting title="Edit" setting="edit" />
        </div>
      </div>
    );
  }

  toggleVisibility() {
    const { onSetTripVisibility, trip: { visibility } } = this.props;
    onSetTripVisibility(visibility === 'private' ? 'public' : 'private');
  }
}

TripDetailsView.propTypes = {
  onShowDestination: PropTypes.func.isRequired,
  onSetTripVisibility: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired
};

const styles = {
  h1: {
    fontSize: 36,
    marginTop: 0,
    paddingTop: 20
  },
  settingsSection: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    margin: "10px 0px"
  },
  titleSection: {
    marginTop: dimensions.navigationBar.height,
    padding: "0 " + dimensions.leftColumn.sidePadding + " 0"
  }
};

export default TripDetailsView;

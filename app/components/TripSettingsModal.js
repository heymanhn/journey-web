'use strict';

import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import PlaceAutocomplete from 'app/containers/PlaceAutocomplete';
import ModalView from './ModalView';
import TextInput from './TextInput';
import { acComponents } from 'app/constants';

class TripSettingsModal extends Component {
  render() {
    const {
      destinationName,
      isFetching,
      isSaveDisabled,
      onEnterTitle,
      onHide,
      onSetPrivate,
      onSetPublic,
      onUpdateTrip,
      showModal,
      title,
      visibility
    } = this.props;

    return (
      <ModalView
        isFetching={isFetching}
        isSaveDisabled={isSaveDisabled}
        keyboard={false}
        onHide={onHide}
        onSaveChanges={onUpdateTrip}
        showModal={showModal}
        title="Edit Trip"
      >
        <div style={styles.inputSection}>
          <h4>Name your trip:</h4>
          <TextInput
            onChange={onEnterTitle}
            style={styles.inputField}
            defaultValue={title}
          />
        </div>

        <div style={styles.inputSection}>
          <h4>Where do you want to go?</h4>
          <PlaceAutocomplete
            defaultValue={destinationName}
            id={acComponents.tripAC}
            placeholder="Enter a destination"
            style={styles.tripAC}
          />
        </div>

        <div style={styles.inputSection}>
          <h4>Visibility:</h4>
          <ButtonGroup>
            <Button
              active={visibility === 'public'}
              onClick={onSetPublic}
            >
              <img
                src="../assets/setting-public-icon.png"
                style={styles.visibilityIcon}
              />
              <span>Public</span>
            </Button>
            <Button
              active={visibility === 'private'}
              onClick={onSetPrivate}
            >
              <img
                src="../assets/setting-private-icon.png"
                style={styles.visibilityIcon}
              />
              <span>Private</span>
            </Button>
          </ButtonGroup>
        </div>
      </ModalView>
    );
  }
}

TripSettingsModal.propTypes = {
  destinationName: PropTypes.string.isRequired,
  isFetching: PropTypes.bool,
  isSaveDisabled: PropTypes.bool,
  onEnterTitle: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onSetPrivate: PropTypes.func.isRequired,
  onSetPublic: PropTypes.func.isRequired,
  onUpdateTrip: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  visibility: PropTypes.string.isRequired
};

const styles = {
  inputField: {
    fontSize: 14,
    margin: 0,
    width: 350
  },
  inputSection: {
    paddingBottom: 10
  },
  tripAC: {
    width: 350,
    zIndex: 3
  },
  visibilityIcon: {
    paddingRight: 5
  }
};

export default TripSettingsModal;

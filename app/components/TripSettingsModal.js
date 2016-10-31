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
      error,
      isFetching,
      isSaveDisabled,
      modalSaveTitle,
      modalTitle,
      onEnterTitle,
      onHide,
      onSaveTrip,
      onSetPrivate,
      onSetPublic,
      onSetViewOnly,
      showModal,
      title,
      visibility
    } = this.props;

    return (
      <ModalView
        error={error}
        isFetching={isFetching}
        isSubmitDisabled={isSaveDisabled}
        keyboard={false}
        onHide={onHide}
        onSubmit={onSaveTrip}
        submitTitle={modalSaveTitle}
        showModal={showModal}
        title={modalTitle}
      >

        <div style={styles.inputSection}>
          <h4>Name your trip:</h4>
          <TextInput
            onChange={onEnterTitle}
            placeholder="Trip Name"
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
              style={styles.visibilityButton}
            >
              <img
                src="../assets/setting-public-icon.png"
                style={styles.visibilityIcon}
              />
              <span>Public</span>
            </Button>
            <Button
              active={visibility === 'viewOnly'}
              onClick={onSetViewOnly}
              style={styles.visibilityButton}
            >
              <img
                src="../assets/setting-viewonly-icon.png"
                style={styles.visibilityIcon}
              />
              <span>View Only</span>
            </Button>
            <Button
              active={visibility === 'private'}
              onClick={onSetPrivate}
              style={styles.visibilityButton}
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
  destinationName: PropTypes.string,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  isSaveDisabled: PropTypes.bool,
  modalSaveTitle: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  onEnterTitle: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onSaveTrip: PropTypes.func.isRequired,
  onSetPrivate: PropTypes.func.isRequired,
  onSetPublic: PropTypes.func.isRequired,
  onSetViewOnly: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  title: PropTypes.string,
  visibility: PropTypes.string
};

const styles = {
  visibilityButton: {
    height: 35
  },
  inputField: {
    margin: 0,
    width: 350
  },
  inputSection: {
    paddingBottom: 10
  },
  tripAC: {
    fontSize: 14,
    width: 350,
    zIndex: 3
  },
  visibilityIcon: {
    paddingRight: 5
  }
};

export default TripSettingsModal;

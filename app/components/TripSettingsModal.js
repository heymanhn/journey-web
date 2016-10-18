'use strict';

require('app/stylesheets/tripSettingsModal.css');

import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import PlaceAutocomplete from 'app/containers/PlaceAutocomplete';
import Spinner from './Spinner';
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

    const savingSpinner = (
      <Spinner
        customColor="white"
        customStyle={styles.spinner}
      />
    );

    return (
      <Modal keyboard={false} onHide={onHide} show={showModal}>
        <Modal.Header style={styles.header} closeButton>
          <Modal.Title style={styles.title}>Edit Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              id={acComponents.updateTripAC}
              placeholder="Enter a destination"
              style={styles.updateTripAC}
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
        </Modal.Body>
        <Modal.Footer style={styles.footer}>
          <Button onClick={onHide}>Cancel</Button>
          <Button
            bsStyle="primary"
            disabled={isSaveDisabled}
            onClick={onUpdateTrip}
            style={styles.saveChangesButton}
          >
            {isFetching ? savingSpinner : (<span>Save changes</span>)}
          </Button>
        </Modal.Footer>
      </Modal>
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
  footer: {
    backgroundColor: "f7f7f7",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  header: {
    backgroundColor: "#e91e63",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    color: "white"
  },
  inputField: {
    fontSize: 14,
    margin: 0,
    width: 350
  },
  inputSection: {
    paddingBottom: 10
  },
  saveChangesButton: {
    width: 120
  },
  spinner: {
    float: "left",
    height: 20,
    left: "50%",
    marginRight: 2,
    position: "relative",
    top: 10,
    width: 20
  },
  title: {
    fontWeight: "normal"
  },
  updateTripAC: {
    width: 350,
    zIndex: 3
  },
  visibilityIcon: {
    paddingRight: 5
  }
};

export default TripSettingsModal;

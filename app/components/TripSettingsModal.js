'use strict';

import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import PlaceAutocomplete from 'app/containers/PlaceAutocomplete';
import TextInput from './TextInput';
import { acComponents } from 'app/constants';

class TripSettingsModal extends Component {
  render() {
    const {
      onEnterTitle,
      onHide,
      showModal,
      trip: { title, destination: { name: destinationName }, visibility }
    } = this.props;

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
              <Button active={visibility === 'public'}>
                <img
                  src="../assets/setting-public-icon.png"
                  style={styles.visibilityIcon}
                />
                <span>Public</span>
              </Button>
              <Button active={visibility === 'private'}>
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
          <Button bsStyle="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

TripSettingsModal.propTypes = {
  onEnterTitle: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  trip: PropTypes.object.isRequired
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

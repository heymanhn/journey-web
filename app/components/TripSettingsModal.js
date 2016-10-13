'use strict';

import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import { findDOMNode } from 'react-dom';
import TextInput from './TextInput';

class TripSettingsModal extends Component {
  render() {
    const {
      onEnterTitle,
      onHide,
      showModal,
      trip: { title, destination: { name: destinationName }, visibility }
    } = this.props;

    return (
      <Modal onHide={onHide} show={showModal}>
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
            <TextInput
              ref={x => {
                this.updateDestInput = x;
                x && this.loadGoogleAutocompleteAPI();
              }}
              style={styles.inputField}
              defaultValue={destinationName}
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

  loadGoogleAutocompleteAPI() {
    const { onEnterDestination } = this.props;

    // API documentation: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
    const options = { types: ['(regions)'] };
    const input = findDOMNode(this.updateDestInput);
    const ac = new window.google.maps.places.Autocomplete(input, options);
    ac.addListener(
      'place_changed',
      () => { onEnterDestination(ac.getPlace()); }
    );
  }
}

TripSettingsModal.propTypes = {
  onEnterDestination: PropTypes.func.isRequired,
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
    margin: 0,
    width: 350
  },
  inputSection: {
    paddingBottom: 10
  },
  title: {
    fontWeight: "normal"
  },
  visibilityIcon: {
    paddingRight: 5
  }
};

export default TripSettingsModal;

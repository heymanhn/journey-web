'use strict';

import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import TextInput from './TextInput';

class TripSettingsModal extends Component {
  render() {
    const { fields, onHide, show } = this.props;

    if (!fields) {
      return null;
    }

    const { destination, title, visibility } = fields;
    return (
      <Modal onHide={onHide} show={show}>
        <Modal.Header style={styles.header} closeButton>
          <Modal.Title style={styles.title}>Edit Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={styles.inputSection}>
            <h4>Name your trip:</h4>
            <TextInput
              style={styles.inputField}
              defaultValue={title}
            />
          </div>

          <div style={styles.inputSection}>
            <h4>Where do you want to go?</h4>
            <TextInput
              style={styles.inputField}
              defaultValue={destination.name}
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
  fields: PropTypes.object,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
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

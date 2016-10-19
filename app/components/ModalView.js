'use strict';

require('app/stylesheets/modalView.css');

import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import Spinner from './Spinner';

class ModalView extends Component {
  render() {
    const {
      children,
      isFetching,
      isSaveDisabled,
      onHide,
      onSaveChanges,
      showModal,
      title
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
          <Modal.Title style={styles.title}>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer style={styles.footer}>
          <Button onClick={onHide}>Cancel</Button>
          <Button
            bsStyle="primary"
            disabled={isSaveDisabled}
            onClick={onSaveChanges}
            style={styles.saveChangesButton}
          >
            {isFetching ? savingSpinner : (<span>Save changes</span>)}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalView.propTypes = {
  isFetching: PropTypes.bool,
  isSaveDisabled: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
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
  }
};

export default ModalView;

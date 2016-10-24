'use strict';

require('app/stylesheets/modalView.css');

import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import Spinner from './Spinner';
import { colors } from 'app/constants';

class ModalView extends Component {
  render() {
    const {
      children,
      error,
      isFetching,
      isSubmitDisabled,
      keyboard,
      onHide,
      onSubmit,
      submitTitle,
      showModal,
      small,
      title
    } = this.props;

    const loadingSpinner = (
      <Spinner
        customColor="white"
        customStyle={styles.spinner}
      />
    );

    const errorMessage = error && (
      <div style={styles.errorMessage}>
        <span style={styles.errorMessageLabel}>Error: </span>
        {error}
      </div>
    );

    return (
      <Modal
        dialogClassName={small && "small-modal"}
        keyboard={keyboard}
        onHide={onHide}
        show={showModal}
      >
        <Modal.Header style={styles.header} closeButton>
          <Modal.Title style={styles.title}>{title}</Modal.Title>
        </Modal.Header>
        {errorMessage}
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer style={styles.footer}>
          <Button onClick={onHide}>Cancel</Button>
          <Button
            bsStyle="primary"
            disabled={isSubmitDisabled}
            onClick={onSubmit}
            style={styles.submitButton}
          >
            {isFetching ? loadingSpinner : (<span>{submitTitle}</span>)}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ModalView.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  isSubmitDisabled: PropTypes.bool,
  keyboard: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  small: PropTypes.bool,
  showModal: PropTypes.bool.isRequired,
  submitTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const styles = {
  errorMessage: {
    backgroundColor: colors.primaryError,
    color: "#333333",
    padding: "10px 15px"
  },
  errorMessageLabel: {
    fontWeight: "bold"
  },
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
  submitButton: {
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

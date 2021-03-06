'use strict';

require('app/stylesheets/modal-view.css');

import React, { Component, PropTypes } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';
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
      <ErrorMessage error={error} style={styles.errorMessage} />
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
            disabled={isSubmitDisabled}
            onClick={onSubmit}
            style={this.loadSubmitButtonStyle()}
          >
            {isFetching ? loadingSpinner : (<span>{submitTitle}</span>)}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  loadSubmitButtonStyle() {
    const { submitTitle } = this.props;
    const style = styles.submitButton;

    const redBg = {
      backgroundColor: colors.primary,
      width: 80
    };

    return submitTitle === 'Delete' ? { ...style, ...redBg } : style;
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
    padding: "10px 15px",
    width: "100%"
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
  spinner: {
    height: 20,
    left: "50%",
    marginRight: 2,
    position: "relative",
    top: 10,
    width: 20
  },
  submitButton: {
    backgroundColor: colors.secondary,
    border: "none",
    color: "#ffffff",
    padding: "6px 15px",
    width: 120
  },
  title: {
    fontWeight: "normal"
  }
};

export default ModalView;

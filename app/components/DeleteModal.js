'use strict';

import React, { Component, PropTypes } from 'react';
import ModalView from './ModalView';
import { colors } from 'app/constants';

class DeleteModal extends Component {
  render() {
    const {
      contentTitle,
      error,
      isFetching,
      modalTitle,
      onDelete,
      onHide,
      showModal
    } = this.props;

    const titleSpan = (
      <span style={styles.contentTitle}>{contentTitle}</span>
    );

    return (
      <ModalView
        error={error}
        isFetching={isFetching}
        isSubmitDisabled={isFetching}
        keyboard={true}
        onHide={onHide}
        onSubmit={onDelete}
        submitTitle="Delete"
        showModal={showModal}
        small
        title={modalTitle}
      >
        <div style={styles.confirmText}>
          Are you sure you want to delete {titleSpan}?
        </div>
      </ModalView>
    );
  }
}

DeleteModal.propTypes = {
  contentTitle: PropTypes.string,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  modalTitle: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

const styles = {
  confirmText: {
    margin: "10px 0"
  },
  contentTitle: {
    color: colors.primary,
    fontWeight: 500
  }
};

export default DeleteModal;

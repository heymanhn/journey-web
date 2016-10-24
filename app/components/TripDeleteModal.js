'use strict';

import React, { Component, PropTypes } from 'react';
import ModalView from './ModalView';

class TripDeleteModal extends Component {
  render() {
    const {
      error,
      isFetching,
      onDeleteTrip,
      onHide,
      showModal
    } = this.props;

    return (
      <ModalView
        error={error}
        isFetching={isFetching}
        isSubmitDisabled={isFetching}
        keyboard={true}
        onHide={onHide}
        onSubmit={onDeleteTrip}
        submitTitle="Delete"
        showModal={showModal}
        title="Delete Trip"
      >
        <div style={styles.confirmText}>
          Are you sure you want to delete this trip?
        </div>
      </ModalView>
    );
  }
}

TripDeleteModal.propTypes = {
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  onDeleteTrip: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  title: PropTypes.string
};

const styles = {
  confirmText: {
    margin: "10px 0"
  }
};

export default TripDeleteModal;

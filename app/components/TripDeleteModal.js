'use strict';

import React, { Component, PropTypes } from 'react';
import ModalView from './ModalView';
import { colors } from 'app/constants';

class TripDeleteModal extends Component {
  render() {
    const {
      error,
      isFetching,
      onDeleteTrip,
      onHide,
      showModal,
      tripTitle
    } = this.props;

    const tripTitleSpan = <span style={styles.tripTitle}>{tripTitle}</span>;

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
        small
        title="Delete Trip"
      >
        <div style={styles.confirmText}>
          Are you sure you want to delete {tripTitleSpan}?
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
  title: PropTypes.string,
  tripTitle: PropTypes.string
};

const styles = {
  confirmText: {
    margin: "10px 0"
  },
  tripTitle: {
    color: colors.primary,
    fontWeight: 500
  }
};

export default TripDeleteModal;

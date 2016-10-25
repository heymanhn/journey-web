'use strict';

import React, { Component, PropTypes } from 'react';
import { Button, FormControl, Modal } from 'react-bootstrap';
import ModalView from './ModalView';
import TextInput from './TextInput';

class TripIdeaSettingsModal extends Component {
  render() {
    const {
      comment,
      isFetching,
      isSaveDisabled,
      onEnterComment,
      onHide,
      onUpdateTripIdea,
      showModal
    } = this.props;

    return (
      <ModalView
        isFetching={isFetching}
        isSubmitDisabled={isSaveDisabled}
        keyboard={true}
        onHide={onHide}
        onSubmit={onUpdateTripIdea}
        submitTitle="Save Changes"
        showModal={showModal}
        title="Edit Trip Idea"
      >
        <div style={styles.inputSection}>
          <h4>Comment:</h4>
          <FormControl
            componentClass="textarea"
            defaultValue={comment}
            onChange={onEnterComment}
            style={styles.textAreaField}
          />
        </div>
      </ModalView>
    );
  }
}

TripIdeaSettingsModal.propTypes = {
  comment: PropTypes.string,
  isFetching: PropTypes.bool,
  isSaveDisabled: PropTypes.bool,
  onEnterComment: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
  onUpdateTripIdea: PropTypes.func.isRequired,
  showModal: PropTypes.bool
};

const styles = {
  textAreaField: {
    fontSize: 14,
    height: 120,
    margin: 0,
    width: 500,
  },
  inputSection: {
    paddingBottom: 10
  },
};

export default TripIdeaSettingsModal;

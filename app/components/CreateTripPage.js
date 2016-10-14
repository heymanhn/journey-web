'use strict';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';
import TextInput from './TextInput';

class CreateTripPage extends Component {
  render() {
    const {
      error,
      onCreateTripPress,
      onEnterTitle,
      onQueryAutocomplete,
      onSetVisibility
    } = this.props;

    return (
      <div>
        <h1>New Trip</h1>
        <div>
          <TextInput
            onChange={onEnterTitle}
            placeholder="Trip Title"
            style={styles.inputField}
            type="text"
          />
          <TextInput
            onChange={onQueryAutocomplete}
            onKeyUp={this.handleKeyPress.bind(this)}
            ref={x => this.destinationInput = x}
            placeholder="Where do you want to go?"
            style={styles.inputField}
            type="text"
          />
          <div style={styles.inlineDiv}>
            Visibility:
            <input
              type="radio"
              name="tripVisibility"
              value="public"
              defaultChecked
              onChange={onSetVisibility}
            />Public
            <input
              type="radio"
              name="tripVisibility"
              value="private"
              onChange={onSetVisibility}
            />Private
          </div>
          {error && <ErrorMessage error={error} />}
          <Button
            bsStyle="default"
            onClick={onCreateTripPress}
          >
            Create Trip
          </Button>
        </div>
      </div>
    );
  }

  handleKeyPress(event) {
    const { onQueryAutocomplete } = this.props;

    if (event.shiftKey) {
      return null;
    }

    switch(event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
      case 'Home':
      case 'End':
        return onQueryAutocomplete(event);
    }
  }
}

CreateTripPage.propTypes = {
  error: PropTypes.string,
  onCreateTripPress: PropTypes.func.isRequired,
  onEnterTitle: PropTypes.func.isRequired,
  onEnterDestination: PropTypes.func.isRequired,
  onQueryAutocomplete: PropTypes.func.isRequired,
  onSetVisibility: PropTypes.func.isRequired
};

const styles = {
  inlineDiv: {
    display: "inline"
  },
  inputField: {
    width: 400
  }
};

export default CreateTripPage;

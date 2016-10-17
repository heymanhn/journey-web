'use strict';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { Button } from 'react-bootstrap';
import PlaceAutocomplete from 'app/containers/PlaceAutocomplete';
import ErrorMessage from './ErrorMessage';
import TextInput from './TextInput';
import { acComponents } from 'app/constants';

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
          <div style={styles.destinationContainer}>
            <PlaceAutocomplete
              id={acComponents.createTripAC}
              placeholder="Where do you want to go?"
              style={styles.inputField}
            />
          </div>
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
}

CreateTripPage.propTypes = {
  error: PropTypes.string,
  onCreateTripPress: PropTypes.func.isRequired,
  onEnterTitle: PropTypes.func.isRequired,
  onSetVisibility: PropTypes.func.isRequired
};

const styles = {
  destinationContainer: {
    marginLeft: 5
  },
  inlineDiv: {
    display: "inline"
  },
  inputField: {
    width: 400
  }
};

export default CreateTripPage;

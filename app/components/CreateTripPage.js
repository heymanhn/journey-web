'use strict';

import React, { Component, PropTypes } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import { destTextInputStyle, errorMessageStyle } from '../stylesheets/styles';

class CreateTripPage extends Component {
  componentDidMount() {
    const autocomplete = new window.google.maps.places.Autocomplete(
      document.getElementById('destinationInput')
    );
  }

  render() {
    const {
      error,
      onCreateTripPress,
      onEnterTitle,
      onEnterDestination
    } = this.props;

    return (
      <div>
        <h1>New Trip</h1>
        <div>
          <TextInput
            onChange={onEnterTitle}
            placeholder="Trip Title"
          />
          <TextInput
            id="destinationInput"
            onChange={onEnterDestination}
            placeholder="Where do you want to go?"
            style={destTextInputStyle}
          />
          <div style={errorMessageStyle}>{error}</div>
          <Button label="Create Trip" onClick={onCreateTripPress} />
        </div>
      </div>
    );
  }
}

CreateTripPage.propTypes = {
  error: PropTypes.string,
  onCreateTripPress: PropTypes.func.isRequired,
  onEnterTitle: PropTypes.func.isRequired,
  onEnterDestination: PropTypes.func.isRequired
};

export default CreateTripPage;

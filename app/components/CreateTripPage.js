'use strict';

import React, { Component, PropTypes } from 'react';
import Button from './Button';
import TextInput from './TextInput';
import { destTextInputStyle, errorMessageStyle } from '../stylesheets/styles';

class CreateTripPage extends Component {
  componentDidMount() {
    const { onEnterDestination } = this.props;

    // API documentation: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
    const input = document.getElementById('destinationInput');
    const options = { types: ['(regions)'] };
    const ac = new window.google.maps.places.Autocomplete(input, options);
    ac.addListener('place_changed', destinationChanged);

    function destinationChanged() {
      onEnterDestination(ac.getPlace());
    }
  }

  render() {
    const {
      error,
      onCreateTripPress,
      onEnterTitle
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

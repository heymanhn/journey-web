'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import ErrorMessage from './ErrorMessage';
import TextInput from './TextInput';
import {
  destTextInputStyle,
  inlineDivStyle,
} from '../stylesheets/styles';

class CreateTripPage extends Component {
  componentDidMount() {
    this.loadGoogleAutocompleteAPI();
  }

  render() {
    const {
      error,
      onCreateTripPress,
      onEnterTitle,
      onSetVisibility
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
          <div style={inlineDivStyle}>
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

  loadGoogleAutocompleteAPI() {
    const { onEnterDestination } = this.props;

    // API documentation: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
    const input = document.getElementById('destinationInput');
    const options = { types: ['(regions)'] };
    const ac = new window.google.maps.places.Autocomplete(input, options);
    ac.addListener(
      'place_changed',
      () => { onEnterDestination(ac.getPlace()); }
    );
  }
}

CreateTripPage.propTypes = {
  error: PropTypes.string,
  onCreateTripPress: PropTypes.func.isRequired,
  onEnterTitle: PropTypes.func.isRequired,
  onEnterDestination: PropTypes.func.isRequired,
  onSetVisibility: PropTypes.func.isRequired
};

export default CreateTripPage;

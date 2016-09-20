'use strict';

import React, { Component, PropTypes } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import TripPageIdea from './TripPageIdea';
import { tripPageIdeaStyles as styles } from '../stylesheets/styles';

class TripPageIdeasList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newIdea: ''
    };
  }

  componentDidMount() {
    this.loadGoogleAutocompleteAPI();
  }

  componentWillReceiveProps(nextProps) {
    const { onIdeaCleared, resetIdeaBox } = nextProps;

    if (resetIdeaBox) {
      this.setState({ newIdea: '' });
      onIdeaCleared();
    }
  }

  render() {
    const { ideas, onAddIdeaPress } = this.props;

    // Sort the ideas in descending order for display purposes
    const tripIdeas =
      ideas
        .sort((a,b) => a._id < b._id ? 1 : -1)
        .map(idea => {
          return <TripPageIdea key={idea._id} idea={idea} />;
        });

    return (
      <div>
        <h3>Ideas</h3>
        <FormControl
          id="tripIdeaSearchBox"
          type="text"
          placeholder="Add an idea"
          style={styles.searchBox}
          value={this.state.newIdea}
          onChange={this.handleIdeaInput.bind(this)}
        />
        <Button
          bsStyle="success"
          onClick={onAddIdeaPress}
          style={styles.searchBoxButton}
        >
          Add
        </Button>
        {tripIdeas}
      </div>
    );
  }

  handleIdeaInput(event) {
    this.setState({ newIdea: event.target.value });
  }

  // API documentation: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
  loadGoogleAutocompleteAPI() {
    const { onEnterIdea, destination } = this.props;
    const { northeast, southwest } = destination.viewport;

    /*
     * Initiate the Google Maps Javascript API with the bounds set to the trip's
     * destination viewport.
     */
    const bounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(
        southwest.coordinates[1],
        southwest.coordinates[0]
      ),
      new google.maps.LatLng(
        northeast.coordinates[1],
        northeast.coordinates[0]
      )
    );

    const input = document.getElementById('tripIdeaSearchBox');
    const options = {
      bounds,
      types: ['geocode', 'establishment']
    };
    const ac = new window.google.maps.places.Autocomplete(input, options);
    ac.addListener(
      'place_changed',
      () => { onEnterIdea(ac.getPlace()); }
    );
  }
}

TripPageIdeasList.propTypes = {
  destination: PropTypes.object,
  ideas: PropTypes.array,
  onAddIdeaPress: PropTypes.func.isRequired,
  onEnterIdea: PropTypes.func.isRequired,
  onIdeaCleared: PropTypes.func.isRequired,
  resetIdeaBox: PropTypes.bool.isRequired
};

export default TripPageIdeasList;

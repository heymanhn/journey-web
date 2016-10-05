'use strict';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

import { isMobile } from 'app/constants';
import TripIdeaDragPreview from './TripIdeaDragPreview';
import TextInput from './TextInput';
import TripIdea from 'app/containers/TripIdea';

class TripIdeasList extends Component {
  constructor(props) {
    super(props);
    this.state = { showCommentBox: false };
  }

  componentDidMount() {
    this.loadGoogleAutocompleteAPI();
  }

  componentWillReceiveProps(nextProps) {
    const { onIdeaCleared, resetIdeaBox } = nextProps;

    if (resetIdeaBox) {
      // Workaround to access the search Box without React
      document.getElementById('tripIdeaSearchBox').value = '';

      this.setState({ showCommentBox: false });
      onIdeaCleared();
    }
  }

  render() {
    const {
      ideas,
      onAddIdeaPress,
      onEnterIdeaComment
    } = this.props;

    // Sort the ideas in descending order for display purposes
    const tripIdeas =
      ideas
        .map((idea, index) => {
          return (
            <TripIdea
              key={idea._id}
              idea={idea}
              index={index}
            />
          );
        });

    const commentBox = (
      <TextInput
        type="text"
        placeholder="Add a comment"
        style={styles.commentBox}
        onChange={onEnterIdeaComment}
      />
    );

    const dragPreview = (
      <TripIdeaDragPreview ideas={ideas} key="__preview" />
    );

    return (
      <div>
        <div style={styles.inputSection}>
          <h3>Ideas</h3>
          <TextInput
            id="tripIdeaSearchBox"
            type="text"
            placeholder="Add an idea"
            style={styles.searchBox}
          />
          <Button
            bsStyle="success"
            onClick={onAddIdeaPress}
            style={styles.searchBoxButton}
          >
            Add
          </Button>
          {this.state.showCommentBox && commentBox}
        </div>
        <div>
          {tripIdeas}
          {isMobile && dragPreview}
        </div>
      </div>
    );
  }

  // API documentation: https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
  loadGoogleAutocompleteAPI() {
    const { onEnterIdea, destination } = this.props;
    const { northeast, southwest } = destination.viewport;
    const rootPage = this;
    const google = window.google;

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
    const ac = new google.maps.places.Autocomplete(input, options);
    ac.addListener(
      'place_changed',
      () => {
        const place = ac.getPlace();
        onEnterIdea(place);
        rootPage.setState({ showCommentBox: true });
      }
    );
  }
}

TripIdeasList.propTypes = {
  destination: PropTypes.object,
  ideas: PropTypes.array,
  onAddIdeaPress: PropTypes.func.isRequired,
  onEnterIdea: PropTypes.func.isRequired,
  onEnterIdeaComment: PropTypes.func.isRequired,
  onIdeaCleared: PropTypes.func.isRequired,
  resetIdeaBox: PropTypes.bool.isRequired
};

const styles = {
  commentBox: {
    display: 'inline',
    width: '100%',
    marginBottom: 10
  },
  inputSection: {
    marginBottom: 10
  },
  searchBox: {
    display: 'inline',
    width: '80%',
    marginBottom: 10
  },
  searchBoxButton: {
    float: 'right'
  }
};

export default TripIdeasList;
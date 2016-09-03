'use strict';

import { connect } from 'react-redux';
import {
  apiCreateTrip,
  createTripSaveDest,
  createTripSaveTitle,
  createTripSaveVisibility
} from '../actions/actions';
import CreateTripPage from '../components/CreateTripPage';

const mapStateToProps = (state) => {
  return {
    error: state.tripsState.error ? state.tripsState.error : ''
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateTripPress: () => {
      dispatch(apiCreateTrip());
    },
    onEnterTitle: (event) => {
      dispatch(createTripSaveTitle(event.target.value));
    },
    onEnterDestination: (place) => {
      dispatch(createTripSaveDest(place));
    },
    onSetVisibility: (event) => {
      dispatch(createTripSaveVisibility(event.target.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripPage);

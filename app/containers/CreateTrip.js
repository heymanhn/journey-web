'use strict';

import { connect } from 'react-redux';
import {
  apiCreateTrip,
  createTripSaveDest,
  createTripSaveTitle
} from '../actions/actions';
import CreateTripPage from '../components/CreateTripPage';

const mapStateToProps = (state) => {
  return {
    error: state.tripsState.error ? state.tripsState.error.message : ''
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateTripPage);

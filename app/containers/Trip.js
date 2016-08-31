'use strict';

import { connect } from 'react-redux';
import TripPage from '../components/TripPage';

const mapStateToProps = (state) => {
  return {
    trips: state.tripsState.trips
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPage);

'use strict';
import { browserHistory } from 'react-router';
import { apiGetTrip, apiGetTrips } from './trips';

export function viewLandingPage() {
  return browserHistory.push('/');
}

export function viewTripsPage() {
  return (dispatch) => dispatch(apiGetTrips()).then(() => (
    browserHistory.push('/trips')
  ));
}

export function viewTripPage(tripId) {
  return (dispatch) => dispatch(apiGetTrip(tripId)).then(() => (
    browserHistory.push('/trips/' + tripId)
  ));
}

'use strict';
import { browserHistory } from 'react-router';
import { apiGetTrips } from './trips';

export function viewLandingPage() {
  return browserHistory.push('/');
}

export function viewSignupPage() {
  return browserHistory.push('/signup');
}

export function viewTripsPage() {
  return (dispatch, getState) => {
    dispatch(apiGetTrips()).then(() => { browserHistory.push('/trips'); });
  };
}

export function createTrip() {
  return browserHistory.push('/createtrip');
}

export function viewTripPage(tripId) {
  return browserHistory.push('/trips/' + tripId);
}

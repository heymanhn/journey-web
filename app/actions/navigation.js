'use strict';
import { browserHistory } from 'react-router';
import { apiGetTrip, apiGetTrips } from './trips';

export function viewLandingPage() {
  return browserHistory.push('/');
}

export function viewSignupPage() {
  return browserHistory.push('/signup');
}

export function viewTripsPage() {
  return (dispatch) => {
    dispatch(apiGetTrips()).then(() => { browserHistory.push('/trips'); });
  };
}

export function createTrip() {
  return browserHistory.push('/createtrip');
}

export function viewTripPage(tripId) {
  return (dispatch) => {
    dispatch(apiGetTrip(tripId)).then(() => {
      browserHistory.push('/trips/' + tripId);
    });
  };
}

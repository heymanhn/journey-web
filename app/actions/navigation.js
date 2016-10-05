'use strict';
import { browserHistory } from 'react-router';

export function viewLandingPage() {
  return browserHistory.push('/');
}

export function viewSignupPage() {
  return browserHistory.push('/signup');
}

export function viewTripsPage() {
  return browserHistory.push('/trips');
}

export function createTrip() {
  return browserHistory.push('/createtrip');
}

export function viewTripPage(tripId) {
  return browserHistory.push('/trips/' + tripId);
}

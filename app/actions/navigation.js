'use strict';
import { browserHistory } from 'react-router';

// Authentication
export function viewSignupPage() {
  return browserHistory.push('/signup');
}

// Trip Management
export function viewTripsPage() {
  return browserHistory.push('/');
}

export function createTrip() {
  return browserHistory.push('/createtrip');
}

export function viewTripPage(tripId) {
  return browserHistory.push('/trips/' + tripId);
}

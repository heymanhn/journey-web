'use strict';
import { browserHistory } from 'react-router';

export function viewSignupPage() {
  return browserHistory.push('/signup');
}

export function viewTripsPage() {
  return browserHistory.push('/');
}

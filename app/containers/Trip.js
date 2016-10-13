'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import {
  apiGetTrip,
  hideTripSettingsModal,
  updateTripSaveTitle
} from 'app/actions/trips';
import { analytics } from 'app/constants';
import TripPage from 'app/components/TripPage';

const mapStateToProps = (state) => {
  const { error, showModal, trip, updatedFields } = state.tripState;
  return {
    error,
    showModal,
    trip,
    updatedFields
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { tripId } = props.params;
  return {
    onEnterTitle(event) {
      dispatch(updateTripSaveTitle(event.target.value));
    },

    onGetTrip() {
      dispatch(apiGetTrip(tripId));
    },

    onHideTripSettingsModal() {
      dispatch(hideTripSettingsModal());
    },

    trackPageView() {
      dispatch(apiTripPageEvent(analytics.pages.TRIP_PAGE, { tripId } ));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripPage);

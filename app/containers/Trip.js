'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import { apiGetTrip, clearTripError } from 'app/actions/trips';
import { analytics } from 'app/constants';
import TripPage from 'app/components/TripPage';

const mapStateToProps = (state) => {
  const { error, trip } = state.tripState;
  const { tripIdeaSettings, tripSettings } = state.componentsState.modalsState;
  const { showModal: showSettingsModal } = tripSettings;
  const { showModal: showIdeaSettingsModal } = tripIdeaSettings;

  return {
    // Don't display an error if any of the trip modals are open
    error: (!showSettingsModal && !showIdeaSettingsModal) ? error : undefined,
    trip
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const { tripId } = props.params;
  return {
    onClearTripError() {
      dispatch(clearTripError());
    },

    onGetTrip() {
      dispatch(apiGetTrip(tripId));
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

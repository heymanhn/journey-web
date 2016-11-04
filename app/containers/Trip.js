'use strict';

import { connect } from 'react-redux';
import { apiTripPageEvent } from 'app/actions/analytics';
import { updatePageHeight } from 'app/actions/tripPage';
import { apiGetTrip, clearTripError } from 'app/actions/trips';
import { analytics } from 'app/constants';
import TripPage from 'app/components/TripPage';

const mapStateToProps = (state) => {
  const { error, trip } = state.tripState;
  const { tripIdeaSettings, tripSettings } = state.componentsState.modalsState;
  const { pageHeight } = state.componentsState.tripPageState;
  const { showModal: showSettingsModal } = tripSettings;
  const { showModal: showIdeaSettingsModal } = tripIdeaSettings;

  return {
    // Don't display an error if any of the trip modals are open
    error: (!showSettingsModal && !showIdeaSettingsModal) ? error : undefined,
    pageHeight,
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

    onUpdatePageHeight() {
      dispatch(updatePageHeight(window.innerHeight));
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

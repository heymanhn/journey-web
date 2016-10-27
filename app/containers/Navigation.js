'use strict';

import { connect } from 'react-redux';
import { apiRedirect, processLogout } from 'app/actions/auth';
import { setOverrideFrame } from 'app/actions/landingPage';
import { viewTripPage } from 'app/actions/navigation';
import {
  setGravatarActive,
  setGravatarInactive,
  setTooltipInvisible,
  setTooltipVisible
} from 'app/actions/navBar';
import NavigationBar from 'app/components/NavigationBar';

const mapStateToProps = (state) => {
  const { user } = state.authState;
  const { gravatarFocused, tooltipVisible } = state.componentsState.navBarState;
  return {
    gravatarFocused,
    tooltipVisible,
    user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLogoutPress() {
      dispatch(processLogout());
    },

    onSetGravatarActive() {
      dispatch(setGravatarActive());
    },

    onSetGravatarInactive() {
      dispatch(setGravatarInactive());
    },

    onSetOverrideFrameToLogin() {
      // Redirect to a page after login, if specified
      const { redirect } = ownProps;
      redirect && dispatch(apiRedirect(redirect));

      dispatch(setOverrideFrame('login'));
    },

    onSetTooltipInvisible() {
      dispatch(setTooltipInvisible());
    },

    onSetTooltipVisible() {
      dispatch(setTooltipVisible());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);

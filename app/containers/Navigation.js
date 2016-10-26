'use strict';

import { connect } from 'react-redux';
import { processLogout } from 'app/actions/auth';
import { setOverrideFrame } from 'app/actions/landingPage';
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

const mapDispatchToProps = (dispatch) => {
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

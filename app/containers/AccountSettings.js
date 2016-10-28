'use strict';

import { connect } from 'react-redux';
import {
  updateUserSaveEmail,
  updateUserSaveName,
  updateUserSavePassword
} from 'app/actions/auth';
import AccountSettingsPage from 'app/components/AccountSettingsPage';

const mapStateToProps = state => {
  const { name, email } = state.authState.user;
  return {
    email,
    name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEnterName(event) {
      dispatch(updateUserSaveName(event.target.value));
    },

    onEnterEmail(event) {
      dispatch(updateUserSaveEmail(event.target.value));
    },

    onEnterNewPassword(event) {
      dispatch(updateUserSavePassword(event.target.value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingsPage);

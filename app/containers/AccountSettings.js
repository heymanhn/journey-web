'use strict';

import { connect } from 'react-redux';
import {
  apiUpdateUser,
  clearAuthState,
  updateUserSaveEmail,
  updateUserSaveName,
  updateUserSavePassword
} from 'app/actions/auth';
import AccountSettingsPage from 'app/components/AccountSettingsPage';

const mapStateToProps = state => {
  const { error, isFetching, user: { email, name } } = state.authState;
  return {
    email,
    error,
    isFetching,
    name
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearAuthState() {
      dispatch(clearAuthState());
    },

    onEnterName(event) {
      dispatch(updateUserSaveName(event.target.value));
    },

    onEnterEmail(event) {
      dispatch(updateUserSaveEmail(event.target.value));
    },

    onEnterNewPassword(event) {
      dispatch(updateUserSavePassword(event.target.value));
    },

    onSaveChanges() {
      dispatch(apiUpdateUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSettingsPage);

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
  const {
    error,
    isFetching,
    newUserFields,
    user: { email, name }
  } = state.authState;

  let isSubmitDisabled = false;;
  if (Object.keys(newUserFields).length > 0) {
    Object.keys(newUserFields).forEach(key => {
      const value = newUserFields[key];

      // Don't allow submission if there are any empty fields
      if (!value && typeof value !== 'undefined') {
        isSubmitDisabled = true;
      }
    });
  } else {
    isSubmitDisabled = true;
  }

  return {
    isSubmitDisabled: isFetching || isSubmitDisabled,
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
      const name = event.target.value.trim();
      dispatch(updateUserSaveName(name));
    },

    onEnterEmail(event) {
      const email = event.target.value.trim();
      dispatch(updateUserSaveEmail(email));
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

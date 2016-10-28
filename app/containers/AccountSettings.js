'use strict';

import _ from 'underscore';
import { connect } from 'react-redux';
import {
  apiUpdateUser,
  clearAuthState,
  updateUserClearConfirmPwd,
  updateUserClearPassword,
  updateUserSaveConfirmPwd,
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

  let isSubmitDisabled = false;
  const fieldsToValidate = _.pick(newUserFields, ['name', 'email', 'password']);
  if (Object.keys(fieldsToValidate).length > 0) {
    Object.keys(fieldsToValidate).forEach(key => {
      const value = fieldsToValidate[key];

      // Don't allow submission if there are any empty fields
      if (!value && typeof value !== 'undefined') {
        isSubmitDisabled = true;
      }
    });
  } else {
    isSubmitDisabled = true;
  }

  // Password is ony invalid if the boolean is defined and value is false
  const match = newUserFields.passwordsMatch;
  const isPwdInvalid = typeof match !== 'undefined' && !match;

  return {
    email,
    error,
    isFetching,
    isSubmitDisabled: isFetching || isPwdInvalid || isSubmitDisabled,
    name,
    newConfirmPwd: newUserFields.confirmPwd,
    newPassword: newUserFields.password,
    passwordsMatch: match
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearAuthState() {
      dispatch(clearAuthState());
    },

    onEnterConfirmPassword(event) {
      const confirmPassword = event.target.value;

      if (confirmPassword) {
        dispatch(updateUserSaveConfirmPwd(confirmPassword));
      } else {
        dispatch(updateUserClearConfirmPwd());
      }
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
      const password = event.target.value;

      if (password) {
        dispatch(updateUserSavePassword(password));
      } else {
        dispatch(updateUserClearPassword());
      }
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

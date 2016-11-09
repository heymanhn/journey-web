'use strict';

import React, { Component, PropTypes } from 'react';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';
import { colors, dimensions } from 'app/constants';

class AccountSettingsPage extends Component {
  componentWillMount() {
    this.props.onClearAuthState();
  }

  componentWillUnmount() {
    this.props.onClearAuthState();
  }

  render() {
    const {
      email,
      error,
      isFetching,
      isSubmitDisabled,
      name,
      newConfirmPwd,
      newPassword,
      onEnterConfirmPassword,
      onEnterEmail,
      onEnterName,
      onEnterNewPassword,
      onSaveChanges
    } = this.props;

    return (
      <div style={styles.mainContainer}>
        <div style={styles.mainSection}>
          <div style={styles.headerSection}>
            <h1 style={styles.h1}>Account Settings</h1>
          </div>
          <div style={styles.settingsContainer}>
            <div style={styles.settingsHeader}>
              Profile Information
            </div>

            {error && (
              <ErrorMessage error={error} style={styles.errorMessage}/>
            )}

            <div style={styles.settingsFields}>
              <div style={styles.setting}>
                <span style={styles.settingLabel}>Name</span>
                <TextInput
                  defaultValue={name}
                  onChange={onEnterName}
                  placeholder="Full Name"
                  style={styles.textField}
                  tabIndex={1}
                  type="text"
                />
              </div>

              <div style={styles.setting}>
                <span style={styles.settingLabel}>New Password</span>
                <TextInput
                  onChange={onEnterNewPassword}
                  placeholder="New Password"
                  style={this.loadPasswordFieldStyle()}
                  tabIndex={3}
                  type="password"
                  value={newPassword || ""}
                />
              </div>

              <div style={styles.setting}>
                <span style={styles.settingLabel}>Email</span>
                <TextInput
                  defaultValue={email}
                  onChange={onEnterEmail}
                  placeholder="Email Address"
                  style={styles.textField}
                  tabIndex={2}
                  type="text"
                />
              </div>

              <div style={styles.setting}>
                <span style={styles.settingLabel}>Confirm Password</span>
                <TextInput
                  onChange={onEnterConfirmPassword}
                  placeholder="Confirm Password"
                  style={this.loadPasswordFieldStyle()}
                  tabIndex={4}
                  type="password"
                  value={newConfirmPwd || ""}
                />
              </div>
            </div>
          </div>
          <div style={styles.buttonsSection}>
            <SubmitButton
              disabled={isSubmitDisabled}
              isFetching={isFetching}
              onSubmitPress={onSaveChanges}
              style={styles.saveChangesButton}
              tabIndex={5}
              text="Save Changes"
            />
          </div>
        </div>
      </div>
    );
  }

  loadPasswordFieldStyle() {
    const { newConfirmPwd, newPassword, passwordsMatch } = this.props;
    const style = styles.textField;

    // Color code password input fields if either field is set
    if (newPassword && newConfirmPwd) {
      if (passwordsMatch) {
        return { ...style, ...styles.textFieldGreen };
      } else if (typeof passwordsMatch !== 'undefined') {
        return { ...style, ...styles.textFieldRed };
      }
    }

    return style;
  }
}

AccountSettingsPage.propTypes = {
  email: PropTypes.string.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  newConfirmPwd: PropTypes.string,
  newPassword: PropTypes.string,
  onClearAuthState: PropTypes.func.isRequired,
  onEnterConfirmPassword: PropTypes.func.isRequired,
  onEnterEmail: PropTypes.func.isRequired,
  onEnterName: PropTypes.func.isRequired,
  onEnterNewPassword: PropTypes.func.isRequired,
  onSaveChanges: PropTypes.func.isRequired,
  passwordsMatch: PropTypes.bool
};

const styles = {
  buttonsSection: {
    marginTop: 20,
    padding: "0px 30px"
  },
  errorMessage: {
    padding: "10px 30px",
    width: "100%"
  },
  h1: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 300,
    margin: 0
  },
  headerSection: {
    padding: "40px 30px 0px",
  },
  mainContainer: {
    marginTop: 60,
    width: "100%"
  },
  mainSection: {
    margin: "0px auto",
    minHeight: 600,
    maxWidth: dimensions.centeredPage.width,
    paddingBottom: 0
  },
  saveChangesButton: {
    backgroundColor: colors.secondary,
    width: 150
  },
  setting: {
    marginTop: 15
  },
  settingLabel: {
    color: colors.primaryText,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0.2
  },
  settingsContainer: {
    backgroundColor: "#ffffff",
    border: "1px solid #cccccc",
    borderRadius: 3,
    margin: "30px 0px 0px",
    width: "100%",
  },
  settingsFields: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-between",
    padding: "15px 30px"
  },
  settingsHeader: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    color: "#ffffff",
    fontSize: 16,
    fontWeight: 500,
    letterSpacing: 0.2,
    padding: "12px 30px"
  },
  textField: {
    backgroundColor: "#fcfcfc",
    fontSize: 14,
    height: 40,
    margin: "10px 0px 15px",
    width: 280
  },
  textFieldGreen: {
    backgroundColor: "#d4ffbe"
  },
  textFieldRed: {
    backgroundColor: "#ffcfcf"
  }
}
export default AccountSettingsPage;

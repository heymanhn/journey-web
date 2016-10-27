'use strict';

import React, { Component, PropTypes } from 'react';
import ErrorMessage from './ErrorMessage';
import SubmitButton from './SubmitButton';
import TextInput from './TextInput';
import { colors, dimensions } from 'app/constants';

class AccountSettingsPage extends Component {
  render() {
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
            <div style={styles.settingsFields}>
              <div style={styles.setting}>
                <span style={styles.settingLabel}>Name</span>
                <TextInput
                  placeholder="Full Name"
                  style={styles.textField}
                  tabIndex={1}
                  type="text"
                />
              </div>

              <div style={styles.setting}>
                <span style={styles.settingLabel}>New Password</span>
                <TextInput
                  placeholder="New Password"
                  style={styles.textField}
                  tabIndex={3}
                  type="password"
                />
              </div>

              <div style={styles.setting}>
                <span style={styles.settingLabel}>Email</span>
                <TextInput
                  placeholder="Email Address"
                  style={styles.textField}
                  tabIndex={2}
                  type="text"
                />
              </div>

              <div style={styles.setting}>
                <span style={styles.settingLabel}>Confirm Password</span>
                <TextInput
                  placeholder="Confirm Password"
                  style={styles.textField}
                  tabIndex={4}
                  type="password"
                />
              </div>
            </div>
          </div>
          <div style={styles.buttonsSection}>
            <SubmitButton
              isFetching={false}
              onSubmitPress={() => { }}
              style={styles.saveChangesButton}
              tabIndex={5}
              text="Save Changes"
            />
          </div>
        </div>
      </div>
    );
  }
}

AccountSettingsPage.propTypes = {

};

const styles = {
  buttonsSection: {
    marginTop: 20,
    padding: "0px 30px"
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
    color: "#333333",
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
  }
}
export default AccountSettingsPage;

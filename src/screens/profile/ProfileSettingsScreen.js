//! This page is not use in the project I will leave it so we can use it later.
import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';

import {defaultTheme} from '../../constants/Theme';

class ProfileSettingsScreen extends Component {
  render() {
    return (
      <View
        style={[styles.container, {backgroundColor: defaultTheme.background}]}>
        <Text>ProfileSettingsScreen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileSettingsScreen;

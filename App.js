import React, {Component} from 'react';
import {Text, View} from 'react-native';
import LoginScreen from './src/screens/auth/LoginScreen';

import Icon from 'react-native-vector-icons/AntDesign';

class App extends Component {
  render() {
    return (
      <>
        <LoginScreen />
      </>
    );
  }
}

export default App;

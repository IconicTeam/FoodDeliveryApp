import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Login from './src/screens/auth/Login';

import Icon from 'react-native-vector-icons/AntDesign';

class App extends Component {
  render() {
    return (
      <>
        <Login />
      </>
    );
  }
}

export default App;

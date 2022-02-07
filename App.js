import React, {Component} from 'react';
import {Text, View} from 'react-native';
import LoginScreen from './src/screens/auth/LoginScreen';
import NewPassword from './src/screens/auth/NewPassword';

import SplashScreen from './src/screens/SplashScreen';
import IntroSliderScreen from './src/screens/IntroSliderScreen';

// import ThemeProvider from './src/contexts/ThemeProvider';

import ContainerNavigation from './src/navigation/containers/ContainerNavigation';

class App extends Component {
  render() {
    return (
      <>
        {/* <ContainerNavigation></ContainerNavigation> */}
        <NewPassword />
      </>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Text, View } from 'react-native';
// import LoginScreen from './src/screens/auth/LoginScreen';

// import SplashScreen from './src/screens/SplashScreen';
// import IntroSliderScreen from './src/screens/IntroSliderScreen';

import Order from './src/screens/Order';

// import ThemeProvider from './src/contexts/ThemeProvider';

// import ContainerNavigation from './src/navigation/containers/ContainerNavigation';

class App extends Component {
  render() {
    return (
      <>
        {/* <Cart /> */}
        {/* <ContainerNavigation></ContainerNavigation> */}
        {/* <Email /> */}
        <Order />
      </>
    );
  }
}

export default App;

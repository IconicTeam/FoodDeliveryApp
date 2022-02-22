import React, { Component } from 'react';
import { Text, View } from 'react-native';
// import LoginScreen from './src/screens/auth/LoginScreen';
// import SplashScreen from './src/screens/SplashScreen';
// import IntroSliderScreen from './src/screens/IntroSliderScreen';


// import ThemeProvider from './src/contexts/ThemeProvider';

import ContainerNavigation from './src/navigation/containers/ContainerNavigation';

class App extends Component {
  render() {
    return (
      <>
        <ContainerNavigation></ContainerNavigation>
      </>
    );
  }
}

export default App;

{
  /*
render(
  const {width , height , BGColor} = this.props
)

<TouchAbleOpacity style={[styles.login , {width : width , height:height , color : "red"}]} />
*/
}

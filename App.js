import React, {Component} from 'react';
import {Text, View} from 'react-native';
<<<<<<< HEAD
import LoginScreen from './src/screens/auth/LoginScreen';
import NewPassword from './src/screens/auth/NewPasswordScreen';
import MealScreen from './src/screens/MealScreen';
import FavRestaurants from './src/screens/FavRestaurants';
=======
// import LoginScreen from './src/screens/auth/LoginScreen';
// import NewPassword from './src/screens/auth/NewPassword';
// import OneTimePassword from './src/screens/auth/OneTimePassword';
>>>>>>> d0e26c1c4421c47b5038e9a325cdc88f4dde0886

import SplashScreen from './src/screens/SplashScreen';
import IntroSliderScreen from './src/screens/IntroSliderScreen';

// import ThemeProvider from './src/contexts/ThemeProvider';

import ContainerNavigation from './src/navigation/containers/ContainerNavigation';

class App extends Component {
  render() {
    return (
      <>
<<<<<<< HEAD
        {/* <ContainerNavigation></ContainerNavigation> */}
        <FavRestaurants />
=======
        <ContainerNavigation></ContainerNavigation>
>>>>>>> d0e26c1c4421c47b5038e9a325cdc88f4dde0886
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

import React, {Component} from 'react';

import SplashScreen from '../../screens/SplashScreen';
import IntroSliderScreen from '../../screens/IntroSliderScreen';
// import AuthStack from '../navigators/AuthStack';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class ContainerStack extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="IntroSliderScreen" component={IntroSliderScreen} />
        {/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}
      </Stack.Navigator>
    );
  }
}

export default ContainerStack;

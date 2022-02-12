import React, {Component} from 'react';

import SplashScreen from '../../screens/SplashScreen';
import IntroSliderScreen from '../../screens/IntroSliderScreen';
import AuthStack from '../navigators/AuthStack';
import BottomTabs from '../navigators/BottomTabs';
import RestaurantScreen from '../../screens/home/RestaurantScreen';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

class ContainerStack extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="IntroSliderScreen" component={IntroSliderScreen} />
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} />
      </Stack.Navigator>
    );
  }
}

export default ContainerStack;

import React, { Component } from 'react';

// screens
import SplashScreen from '../../screens/SplashScreen';
import IntroSliderScreen from '../../screens/IntroSliderScreen';
import AuthStack from '../navigators/AuthStack';
import BottomTabs from '../navigators/BottomTabs';
import RestaurantScreen from '../../screens/home/RestaurantScreen';
import OrderDetailsScreen from '../../screens/profile/OrderDetailsScreen';
import OrdersScreen from '../../screens/profile/OrdersScreen';

import { createStackNavigator } from '@react-navigation/stack';

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
        <Stack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreen}
        />
        <Stack.Screen
          name="OrdersSreen"
          component={OrdersScreen}
        />
      </Stack.Navigator>
    );
  }
}

export default ContainerStack;

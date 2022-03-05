import React, {Component} from 'react';

// screens
import SplashScreen from '../../screens/SplashScreen';
import IntroSliderScreen from '../../screens/IntroSliderScreen';
import AuthStack from '../navigators/AuthStack';
import BottomTabs from '../navigators/BottomTabs';
import RestaurantScreen from '../../screens/home/RestaurantScreen';
import MealScreen from '../../screens/home/MealScreen';
import OrderDetailsScreen from '../../screens/profile/OrderDetailsScreen';
import OrdersScreen from '../../screens/profile/OrdersScreen';
import ProfileSettingsScreen from '../../screens/profile/ProfileSettingsScreen';
import ChangeAddressScreen from '../../screens/profile/ChangeAddressScreen';
import NotificationSettingScreen from '../../screens/profile/NotificationSettingScreen';
import ChangeThemeScreen from '../../screens/profile/ChangeThemeScreen';
import PaymentScreen from '../../screens/profile/PaymentScreen';
import ContactUsScreen from '../../screens/profile/ContactUsScreen';

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
        <Stack.Screen name="MealScreen" component={MealScreen} />
        <Stack.Screen
          name="OrderDetailsScreen"
          component={OrderDetailsScreen}
        />
        <Stack.Screen name="OrdersScreen" component={OrdersScreen} />
        <Stack.Screen
          name="ProfileSettingsScreen"
          component={ProfileSettingsScreen}
        />
        <Stack.Screen
          name="ChangeAddressScreen"
          component={ChangeAddressScreen}
        />
        <Stack.Screen
          name="NotificationSettingScreen"
          component={NotificationSettingScreen}
        />
        <Stack.Screen name="ChangeThemeScreen" component={ChangeThemeScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
      </Stack.Navigator>
    );
  }
}

export default ContainerStack;

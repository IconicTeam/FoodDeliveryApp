import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../../screens/auth/LoginScreen';
import SignupScreen from '../../screens/auth/SignupScreen';
import EmailScreen from '../../screens/auth/forgetpassword/EmailScreen';
import OneTimePassword from '../../screens/auth/forgetpassword/OneTimePassword';
import NewPassword from '../../screens/auth/forgetpassword/NewPassword';

const Stack = createStackNavigator();

export class AuthStack extends Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="EmailScreen" component={EmailScreen} />
        <Stack.Screen name="OneTimePassword" component={OneTimePassword} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
      </Stack.Navigator>
    );
  }
}

export default AuthStack;

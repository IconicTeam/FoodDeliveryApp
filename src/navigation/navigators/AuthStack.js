import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';

import Login from '../../screens/Login';

const Stack = createStackNavigator();

export class AuthStack extends Component {
  render() {
    return (
      <Stack.Navigator>
        {/* <Stack.Screen name="Login" component={Login} /> */}
      </Stack.Navigator>
    );
  }
}

export default AuthStack;

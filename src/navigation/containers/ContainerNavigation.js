import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import ContainerStack from './ContainerStack';

// createAppContainer(ContainerStack)

class ContainerNavigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <ContainerStack />
      </NavigationContainer>
    );
  }
}

export default ContainerNavigation;

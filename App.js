import React, {Component} from 'react';
import {Text, View} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

class App extends Component {
  render() {
    return (
      <View>
        <Text> Ayad git and github developer </Text>
        <Text> Abdelrahman Ayad git and github developer </Text>
        <Text>Ady Hatem</Text>
        <Icon name="staro" size={50} style={{alignSelf: 'center'}} />
        <Text style={{fontSize: 25, fontFamily: 'ArabicFont'}}>الحب سماء</Text>
      </View>
    );
  }
}

export default App;

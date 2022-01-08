import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, AsyncStorage} from 'react-native';

import {defaultTheme} from '../constants/Theme';

import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('screen');

export class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // Don't forget switch navigation

  async componentDidMount() {
    let switchNav = await AsyncStorage.getItem('switch'); // || "IntroSlider";
    setTimeout(() => {
      if (switchNav == null || switchNav == undefined) {
        this.props.navigation.replace('IntroSliderScreen');
      } else if (switchNav == 'Auth') {
        this.props.navigation.replace('AuthStack');
      }
    }, 3000);
  }

  render() {
    return (
      <View style={[styles.body, {backgroundColor: defaultTheme.background}]}>
        <View style={styles.lottieViewContainer}>
          <LottieView
            source={require('../assets/lotties/burger.json')}
            autoPlay
            loop
            speed={2.5}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieViewContainer: {
    width: width * 0.3,
    height: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;

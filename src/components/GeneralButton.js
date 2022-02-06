import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export class GeneralButton extends Component {
  render() {
    const {title, BGcolor, width, height, textColor, haveBorder, textSize} =
      this.props;
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.4}
          style={[
            styles.loginBT,
            {
              width, // or width : width
              height, // height : height
              backgroundColor: BGcolor, // if BGcolor is a props of View then wrote BGcolor only
              borderWidth: haveBorder ? 2 : 0,
            },
          ]}>
          <Text
            style={[styles.textTitle2, {color: textColor, fontSize: textSize}]}>
            {title}
          </Text>
        </TouchableOpacity>
      </>
    );
  }
}
const styles = StyleSheet.create({
  loginBT: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  textTitle2: {
    fontFamily: 'Tajawal',
  },
});

export default GeneralButton;

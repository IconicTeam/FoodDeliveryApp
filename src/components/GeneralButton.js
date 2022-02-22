import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('screen');
class GeneralButton extends Component {
  render() {
    const {
      title,
      BGcolor,
      // width,
      // height,
      textColor,
      haveBorder,
      textSize,
      onPress,
      otherStyles,
      disabled,
    } = this.props;

    // console.log('render');
    return (
      <>
        <TouchableOpacity
          disabled={disabled}
          activeOpacity={0.4}
          onPress={onPress}
          style={[
            styles.generalBtn,
            {
              // width, // or width : width
              // height, // height : height
              backgroundColor: BGcolor, // if BGcolor is a props of View then wrote BGcolor only
              borderWidth: haveBorder ? 2 : 0,
              ...otherStyles,
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
  generalBtn: {
    width: width * 0.5,
    height: height * 0.065,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textTitle2: {
    fontFamily: 'Tajawal',
  },
});

export default React.memo(GeneralButton);

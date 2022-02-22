import React from 'react';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const ApiKey = 'AIzaSyAzi-VsKf5utZC3mqz_CgVVLyyzxqxco7Q';

export const FONTS = {
  fontFamily: 'Tajawal',
};

export const SIZES = {
  tinyFontSize: height * 0.015,
  smallFontSize: height * 0.017,
  mediumFontSize: height * 0.023,
  largeFontSize: height * 0.032,
  // Icons
  smallIconSize: Math.floor(height * 0.02),
  mediumIconSize: Math.floor(height * 0.03),
  largeIconSize: Math.floor(height * 0.05),
  // bottom sheet
  bottomSheetHeight: height * 0.43,
  buttonsHeight: height / 18,
};

export const PADDINGS = {
  smallPadding: height / 80,
  padding: height / 50,
  largePadding: height / 32,
};

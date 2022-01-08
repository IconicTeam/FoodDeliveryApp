import React from 'react';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const SIZES = {
  smallFontSize: height * 0.017,
  mediumFontSize: height * 0.023,
  largeFontSize: height * 0.038,
  // Icons
  smallIconSize: Math.floor(height * 0.02),
  mediumIconSize: Math.floor(height * 0.03),
  largeIconSize: Math.floor(height * 0.05),
};

export const PADDINGS = {
  smallPadding: height / 80,
  padding: height / 50,
  largePadding: height / 32,
};

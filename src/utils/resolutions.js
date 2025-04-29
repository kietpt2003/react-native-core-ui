import { Platform, StatusBar, Dimensions } from 'react-native';
import {
  isIphoneX,
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';

const { height, width } = Dimensions.get('window');
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 592;
const standardLength = width > height ? width : height;
const offset =
  width > height ? 0 : Platform.OS === 'ios' ? 78 : StatusBar.currentHeight;

const deviceHeight =
  isIphoneX() || Platform.OS === 'android'
    ? standardLength - offset
    : standardLength;

export function RFPercentage(percent) {
  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
}

export function DeviceIpad() {
  if (Platform.isPad === true) {
    return true;
  } else {
    return false;
  }
}

export { width, height };

// guideline height for standard 5" device screen is 680
export function RFValue(fontSize, standardScreenHeight = 680) {
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}

// padding, margin, fontSize, ....
export const scale = size => (width / guidelineBaseWidth) * parseInt(size, 10);

// width
export const wScale = size =>
  (height / guidelineBaseHeight) * parseInt(size, 10);

// height
export const hScale = (size, factor = 0.5) =>
  parseInt(size, 10) +
  (scale(parseInt(size, 10)) - parseInt(size, 10)) * factor;

export const getPaddingTop = () => {
  // 26 OPPO
  // 28 NOKIA
  let sbHeight = getStatusBarHeight();
  return (sbHeight >= 26 && sbHeight < 28) || sbHeight === 30 ? sbHeight : 0;
};

export const getPaddingBottom = () => {
  let paddingBottom = getBottomSpace() / 2;
  return paddingBottom;
};

export const isTablet = DeviceInfo.isTablet();

/**
 * @param {Object} styles - StyleProp
 * @param {ViewStyle} styles.tablet - Styles for tablet
 * @param {ViewStyle} styles.phone - Styles for phone
 */
export const StylePlatform = styles => {
  if (isTablet) {
    return styles.tablet || {};
  }
  return styles.phone || {};
};

export const SIZE_IMAGE = width / 2 - 2 - scale(5);
export const SIZE_IMAGE_2 = (width - 8 - scale(10)) / 3;

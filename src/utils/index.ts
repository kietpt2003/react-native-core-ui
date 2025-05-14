import {
  statusBarHeight,
  StylePlatform,
  getPaddingBottom,
  getPaddingTop,
  isTablet,
} from './resolutions';
import { filterAllowedTextStyle } from './filters';
import {
  width,
  height,
  IPHONE_12_HEIGTH,
  IPHONE_12_WIDTH,
  scale,
  scaleH,
  scaleFont,
  moderateScale,
  moderateHeightScale,
} from './scale';
import cleanTagHTML from './cleanTagHTML';
import {
  convertString,
  convertNumber,
  convertSeconds,
  formatHour,
} from './converter';
import debounce from './debounce';
import fixedDistance from './fixedDistance';
import formatMoney from './formatMoney';

export {
  width,
  height,
  IPHONE_12_HEIGTH,
  IPHONE_12_WIDTH,
  scale,
  scaleH,
  scaleFont,
  statusBarHeight,
  filterAllowedTextStyle,
  moderateScale,
  moderateHeightScale,
  StylePlatform,
  getPaddingBottom,
  getPaddingTop,
  isTablet,
  cleanTagHTML,
  convertString,
  convertNumber,
  convertSeconds,
  formatHour,
  debounce,
  fixedDistance,
  formatMoney,
}
import { Platform, StatusBar, StyleProp } from 'react-native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';

/**
 * getPaddingTop - Get the top padding based on the device type
 * 
 * 26 OPPO
 * 28 NOKIA
 * @returns {number} - Top padding
 * @example
 * ```jsx
 * import { getPaddingTop } from '@kietpt2003/react-native-core-ui/utils';
 * const paddingTop = getPaddingTop();
 * console.log("paddingTop:", paddingTop);
 * ```
 */
export const getPaddingTop = (): number => {
  // 26 OPPO
  // 28 NOKIA
  let sbHeight = getStatusBarHeight();
  return (sbHeight >= 26 && sbHeight < 28) || sbHeight === 30 ? sbHeight : 0;
};

/**
 * getPaddingBottom - Get the bottom padding based on the device type
 * @returns {number} - Bottom padding
 * @example
 * ```jsx
 * import { getPaddingBottom } from '@kietpt2003/react-native-core-ui/utils';
 * const paddingBottom = getPaddingBottom();
 * console.log("paddingBottom:", paddingBottom);
 * ```
 */
export const getPaddingBottom = (): number => {
  let paddingBottom = getBottomSpace() / 2;
  return paddingBottom;
};

/**
 * isTablet - Check if the device is a tablet
 * @returns {boolean} - true if the device is a tablet, false otherwise
 * @example
 * ```jsx
 * import { isTablet } from '@kietpt2003/react-native-core-ui/utils';
 * console.log("isTablet", isTablet); // true/false
 * ```
 */
export const isTablet = DeviceInfo.isTablet();

/**
 * Use this function to get the styles based on the device type
 * @example
 * ```jsx
 * <View style={StylePlatform({
      tablet: styles.containerTablet,
      phone: styles.containerPhone
    })}>
      <Text style={StylePlatform({
        tablet: styles.textTablet,
        phone: styles.textPhone
      })}>
        Hello, Platform!
      </Text>
    </View>
    ```
 */
export const StylePlatform = (styles: StyleProp<any>) => {
  if (isTablet) {
    return styles.tablet || {};
  }
  return styles.phone || {};
};

/**
 * statusBarHeight of the device
 * @returns {number} - statusBarHeight
 * @example
 * ```jsx
 * import { statusBarHeight } from '@kietpt2003/react-native-core-ui/utils';
 * console.log("statusBarHeight", statusBarHeight);
 * ```
 */
export const statusBarHeight = (Platform.OS == "android" && StatusBar.currentHeight) ? StatusBar.currentHeight : 0;

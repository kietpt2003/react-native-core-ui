import { Dimensions, PixelRatio } from "react-native";

export const { width, height } = Dimensions.get('window');

/**
 * Just a constants that specify iPhone 12 width.
 * 
 * *Example:*
 * 
 * ```js
 *  import { IPHONE_12_WIDTH } from '@kietpt2003/react-native-core-ui/utils';
 *  console.log(IPHONE_12_WIDTH); // 375
 * ```
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const IPHONE_12_WIDTH = 375;

/**
 * Just a constants that specify iPhone 12 height.
 * 
 * *Example:*
 * 
 * ```js
 *  import { IPHONE_12_HEIGTH } from '@kietpt2003/react-native-core-ui/utils';
 *  console.log(IPHONE_12_HEIGTH); // 812
 * ```
 *  
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const IPHONE_12_HEIGTH = 812;

export const scaleWidth = width / IPHONE_12_WIDTH;

export const scaleHeight = height / IPHONE_12_HEIGTH;

export const scaleAvg = ( scaleWidth + scaleHeight) / 2;

/**
 * Will return a linear scaled result of the provided size, based on scaleAvg. Use for scaling font.
 * 
 * *Example:*
 * ```jsx
 *    import  { scaleFont } from '@kietpt2003/react-native-core-ui/utils';
 *    import { StyleSheet } from 'react-native';
 *  
 *    const styles = StyleSheet.create({
 *      text: {
 *        fontSize: scaleFont(16), // fontSize._16
 *      },
 *    });
 * ```
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const scaleFont = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(size * scaleAvg));

/**
 * Will return a linear scaled result of the provided size, based on your device's screen width.
 * 
 * *Example:*
 * ```jsx
 *    import  { scale } from '@kietpt2003/react-native-core-ui/utils';
 *    import { StyleSheet } from 'react-native';
 *  
 *    const styles = StyleSheet.create({
 *      container: {
 *        padding: scale(5),
 *      },
 *    });
 * ```
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const scale = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(size * scaleWidth));

/**
 * Will return a linear scaled result of the provided size, based on your device's screen height.
 * 
 * *Example:*
 * ```jsx
 *    import  { scaleH } from '@kietpt2003/react-native-core-ui/utils';
 *    import { StyleSheet } from 'react-native';
 *  
 *    const styles = StyleSheet.create({
 *      container: {
 *        position: 'absolute',
 *        top: scaleH(5),
 *      },
 *    });
 * ```
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const scaleH = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(size * scaleHeight));

/**
 * Sometimes you don't want to scale everything in a linear manner, that's where moderateScale comes in.  
 * The cool thing about it is that you can control the resize factor (default is 0.5).  
 * If normal scale will increase your size by +2X, moderateScale will only increase it by +X, for example:  
 * ➡️ &nbsp;&nbsp;scale(10) = 20  
 * ➡️ &nbsp;&nbsp;moderateScale(10) = 15  
 * ➡️ &nbsp;&nbsp;moderateScale(10, 0.1) = 11
 * 
 * *Example:*
 * ```jsx
 *    import  { moderateScale } from '@kietpt2003/react-native-core-ui/utils';
 *    import { StyleSheet } from 'react-native';
 *  
 *    const styles = StyleSheet.create({
 *      container: {
 *        padding: moderateScale(5),
 *      },
 *    });
 * ```
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

/**
 * Same as moderateScale, but using scaleH instead of scale.
 * 
 * *Example:*
 * ```jsx
 *    import  { moderateHeightScale } from '@kietpt2003/react-native-core-ui/utils';
 *    import { StyleSheet } from 'react-native';
 *  
 *    const styles = StyleSheet.create({
 *      container: {
 *        padding: moderateHeightScale(5),
 *      },
 *    });
 * ```
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const moderateHeightScale = (size: number, factor = 0.5) =>
  size + (scaleH(size) - size) * factor;
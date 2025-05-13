import { Dimensions, PixelRatio } from "react-native";

export const { width, height } = Dimensions.get('window');

/**
 * Just a constants that specify iPhone 12 width.
 * 
 * *Example: * const IPHONE_12_WIDTH = 375;
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const IPHONE_12_WIDTH = 375;

/**
 * Just a constants that specify iPhone 12 height.
 * 
 * *Example: * const IPHONE_12_HEIGTH = 812;
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const IPHONE_12_HEIGTH = 812;

/**
 * The scaleWidth constant specify the proportional between screenWidth vs IPHONE_12_WIDTH
 * 
 * *Example: * const scaleWidth = width / IPHONE_12_WIDTH;
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const scaleWidth = width / IPHONE_12_WIDTH;

/**
 * The scaleHeight constant specify the proportional between screenHeight vs IPHONE_12_HEIGTH
 * 
 * *Example: * const scaleHeight = height / IPHONE_12_HEIGTH;
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const scaleHeight = height / IPHONE_12_HEIGTH;

/**
 * The scaleAvg specify the average of scaleWidth and scaleHeight
 * 
 * *Example: * const scaleAvg = ( scaleWidth + scaleHeight) / 2;
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const scaleAvg = ( scaleWidth + scaleHeight) / 2;

/**
 * Will return a linear scaled result of the provided size, based on scaleAvg.
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
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const scale = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(size * scaleWidth));

/**
 * Will return a linear scaled result of the provided size, based on your device's screen height.
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
 * If normal scale will increase your size by +2X, moderateScale will only increase it by +X.
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
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function)
 * 
 * @see: https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#scaling-function
 */
export const moderateHeightScale = (size: number, factor = 0.5) =>
  size + (scaleH(size) - size) * factor;
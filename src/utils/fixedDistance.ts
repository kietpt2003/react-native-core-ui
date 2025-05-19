/**
 * Function to format a distance value.
 * - If the input is an integer, it returns the integer value.
 * - If the input is a float, it returns the value formatted to a custom toFixed value decimal places.
 * - If the input is null or undefined, it returns 0.
 * 
 * *Note:* The toFixed value should be between 1 and 5, otherwise it defaults to 2.
 * @example
 * ```js
 * import { fixedDistance } from '@kietpt2003/react-native-core-ui/utils';
 * const distance = fixedDistance(123.456); // "123.46"
 * ```
 */
export default (distance: number = 0, toFixed: number = 2) => {
  const toFixedVal = (toFixed < 1 || toFixed > 5) ? 2 : toFixed;
  return Number.isInteger(Number(distance)) ? distance : distance?.toFixed(toFixedVal);
};

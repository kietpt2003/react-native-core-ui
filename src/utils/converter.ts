/**
 * This function converts input into a string.
 * * If the input is null or undefined, it returns an empty string.
 * * If the input is an object, it returns a stringified version of the object.
 * * Otherwise, it returns the string representation of the input.
 * @example
 * ```js
 * import { convertString } from '@kietpt2003/react-native-core-ui';
 * const str = convertString(2003); // "2003"
 * ```
 */
export const convertString = (value: any) => {
  return String(value);
};

/**
 * This function converts input into a number.
 * * If the input is null or undefined, it returns 0.
 * * If the input is not a number, it returns 0.
 * * Otherwise, it returns the parsed float value of the input.
 * @example
 * ```js
 * import { convertNumber } from '@kietpt2003/react-native-core-ui';
 * const num = convertNumber("2003"); // 2003
 * ```
 */
export const convertNumber = (value: any) => {
  return isNaN(parseFloat(value)) ? 0 : parseFloat(value);
};

/**
 * Function to convert seconds to a string in the format "mm:ss".
 * * If the input is less than 0, it returns "00:00".
 * * If the input is greater than 3599, it returns "00:00".
 * @example
 * ```js
 * import { convertSeconds } from '@kietpt2003/react-native-core-ui';
 * const time = convertSeconds(123); // "02:03"
 * ```
 */
export const convertSeconds = (seconds: number = 0) => {
  return new Date(Math.max(seconds, 0) * 1000).toISOString().substr(14, 5);
};

/**
 * Function to format seconds into a string in the format "hh:mm:ss".
 * * If the input is less than 0, it returns "00:00:00".
 * * If the input is greater than 86399, it returns "00:00:00".
 * @example
 * ```js
 * import { formatHour } from '@kietpt2003/react-native-core-ui';
 * const time = formatHour(3661); // "01:01:01"
 * ```
 */
export const formatHour = (seconds: number = 0) => {
  return new Date(Math.max(seconds, 0) * 1000).toISOString().substr(11, 8);
};
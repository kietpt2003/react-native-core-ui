/**
 * Function to limit the number of words in a string.
 * @param {string} str - The string to limit. *Default:* str = ''
 * @param {number} maxLength - The maximum number of words allowed. *Default:* maxLength = 5
 * @returns {string} - The limited string
 * @example
 * ```js
 * import { limitedString } from '@kietpt2003/react-native-core-ui/utils';
 * const inputString  = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
 * console.log(limitedString(inputString)); // "Lorem Ipsum is simply dummy..."
 * ```
 */
export default (str: string = '', maxLength: number = 5): string => {
  let arr = str.split(' ');
  if (arr.length > maxLength) {
    return arr.slice(0, maxLength).join(' ') + '...';
  }
  return str;
};
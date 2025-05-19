/**
 * Provide a function to clean HTML tags and &nbsp; from a string.
 * 
 * @example
 * ```js
 * import { cleanHTML } from '@kietpt2003/react-native-core-ui/utils';
 *
 * const raw = `
 *   <div>Hello&nbsp;&nbsp;&nbsp;World</div>
 *   <p>This is&nbsp;a <strong>test</strong></p>
 * `;
 *
 * console.log(cleanHTML(raw));
 * // Output:
 * // Hello
 * // World
 * // This is a test
 * ```
 */
export default (str: string = '') => {
  if (str && str.trim().length) {
    let data = [];
    let arr = str.replace(/<\/?[^>]+(>|$)/g, '').split('&nbsp;');

    // break one line when multiple &nbsp;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] && arr[i].trim()) {
        data.push(arr[i]);
      } else if (arr[i - 1] && arr[i - 1].trim()) {
        data.push('\n');
      }
    }
    return data.join('');
  }
  return '';
};

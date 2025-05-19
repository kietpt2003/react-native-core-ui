/**
 * Function to format money values.
 * 
 * `num` - The number to format. Default is 0.
 * 
 * `maximumFractionDigits` - The maximum number of decimal places to display. Default is 0.
 * 
 * `lang`
 * * The locale to use for formatting. Default is 'en-US'.
 * * This should be a BCP 47 language tag (e.g., 'en-US', 'vi-VN').
 * * This is a string that contains a language code and an optional country code, separated by a hyphen.
 * * Structure: `"[languageCode]-[countryCode]"`
 * 
 * @example
 * ```js
 * import { formatMoney } from '@kietpt2003/react-native-core-ui/utils';
 * const money = formatMoney(1234567.89); // "1,234,568"
 * const money2 = formatMoney(1234567.89, 2); // "1,234,567.89"
 * const money3 = formatMoney(1234567.89, 2, 'vi-VN'); // "1.234.567,89"
 * 
 * To get more information. Please see the [Documentation](https://github.com/kietpt2003/react-native-core-ui?tab=readme-ov-file#formatmoney)
 * 
 * *Reference:*
 * - [List of ISO 639 language codes](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes)
 * - [List of ISO 3166-1 country codes](https://vi.wikipedia.org/wiki/ISO_3166-1)
 * ```
 */
export default (num: number = 0, maximumFractionDigits: number = 0, lang: string = 'en-US') => {
  if (!num) {
    return 0;
  }
  return new Intl.NumberFormat(lang, { maximumFractionDigits }).format(num);
};
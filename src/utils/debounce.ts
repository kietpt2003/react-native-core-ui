export type DebouncedFunction<F extends (...args: any[]) => any> = {
  (...args: Parameters<F>): void;
  cancel: () => void;
  flush: () => void;
};

/**
 * - Creates a debounced function that delays invoking the provided function until after
 * a specified delay in milliseconds has elapsed since the last time the debounced
 * function was invoked.
 * - The debounced function comes with `cancel` and `flush` methods to cancel the
 * debounced invocation and to immediately invoke the function, respectively.
 * @example
 * ```jsx
 * import { debounce } from '@kietpt2003/react-native-core-ui';
 * const onChangeText = debounce(() => {
 *   console.log('Function executed!');
 * }, 1000);
 * 
 * //Flush case
 * const debouncedLog = debounce(logMessage, 2000);
 *
 * debouncedLog("Waiting 2s...");
 * setTimeout(() => {
 *   debouncedLog.flush(); // Immediately execute the function
 * }, 1000);
 * 
 * //Cancel case
 * debouncedLog("Canceled");
 * setTimeout(() => {
 *   debouncedLog.cancel(); // Don't execute the function
 * }, 1000);
 * ```
 */
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number,
): DebouncedFunction<F> => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  debounced.flush = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      func();
      timeoutId = null;
    }
  };

  return debounced;
};

export default debounce;

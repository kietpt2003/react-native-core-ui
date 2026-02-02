export default {
  get: () => null,
  getEnforcing: () => {
    throw new Error('TurboModule not available on web');
  },
};
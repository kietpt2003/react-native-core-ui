const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');
const withStorybook = require('@storybook/react-native/metro/withStorybook');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {};

const defaultConfig = getDefaultConfig(__dirname);

const finalConfig = mergeConfig(defaultConfig, config);

/**
 * @type {import('@storybook/react-native/metro/withStorybook').WithStorybookOptions}
 */
const storybookOptions = {
  enabled: process.env.STORYBOOK_ENABLED === 'true',
  configPath: path.resolve(__dirname, './.rnstorybook'),
  onDisabledRemoveStorybook: true,
};
module.exports = withStorybook(finalConfig, storybookOptions);

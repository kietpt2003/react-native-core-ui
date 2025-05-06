module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'react-native-reanimated/plugin',
      {
        processNestedWorklets: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          '@constant': './src/constants',
          '@layout': './src/views/Layout.js',
          '@utils': './src/utils',
        },
      },
    ],
    [
      '@babel/plugin-transform-private-methods',
      {
        loose: true,
      },
    ],
  ],
};

module.exports = {
  root: true,
  extends: '@react-native',
  ignorePatterns: ['metro.config.js', 'documents/*'],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
};

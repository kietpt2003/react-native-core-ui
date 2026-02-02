/**
 * @format
 */
import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';

let RootComponent = App;

if (process.env.STORYBOOK_ENABLED === 'true') {
  RootComponent = require('./.rnstorybook').default;
}

AppRegistry.registerComponent(appName, () => RootComponent);

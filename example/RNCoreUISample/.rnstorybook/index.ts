import AsyncStorage from '@react-native-async-storage/async-storage';
import { width } from '@kietpt2003/react-native-core-ui/utils';

import { view } from './storybook.requires';

// @ts-ignore
const brandTitle = process.env.BRAND_TITLE ?? '';
// @ts-ignore
const brandImage = process.env.BRAND_IMAGE ?? '';

const StorybookUIRoot = view.getStorybookUI({
  theme: {
    brand: {
      image: {
        uri: brandImage,
        width: width,
        height: 80,
      },
      resizeMode: 'contain',
      title: brandTitle
    },
  },
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

export default StorybookUIRoot;

export const TEXT_DEFAULT_SAMPLE = `
import React from 'react';
import { Text } from '@kietpt2003/react-native-core-ui';
import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes';

const DemoScreen = () => {
  return (
    <Text color={colors.black} size={fontSize._14}>
      This is default content. You can change this if you want.
    </Text>
  );
};

export default DemoScreen;

`;

export const TEXT_BOLD_SAMPLE = `
import React from 'react';
import { Text } from '@kietpt2003/react-native-core-ui';

const DemoScreen = () => {
  return (
    <Text bold>
      This is bold content. You can change this if you want.
    </Text>
  );
};

export default DemoScreen;

`;

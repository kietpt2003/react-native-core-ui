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

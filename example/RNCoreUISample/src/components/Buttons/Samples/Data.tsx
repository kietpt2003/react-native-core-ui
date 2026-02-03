export const BUTTON_DEFAULT_SAMPLE = `
import React from 'react';
import { Button } from '@kietpt2003/react-native-core-ui';
import { colors } from '@kietpt2003/react-native-core-ui/themes';
import { showAlert } from '../utils';

const DemoScreen = () => {
  return (
    <Button
      activeBgColor={colors.primary}
      borderColor={colors.primary}
      inactiveBgColor={colors.gray_B3B3B3}
      onLongPress={() =>
        showAlert('Button Long Press!', 'This is custom message')
      }
      onPress={() => showAlert('Button Press!', 'This is custom message')}
      variant="filled"
    />
  );
};

export default DemoScreen;

`;

export const BUTTON_START_ICON_SAMPLE = `
import React from 'react';
import { Button, SvgIcon } from '@kietpt2003/react-native-core-ui';
import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes';
import { scale } from '@kietpt2003/react-native-core-ui/utils';

import { showAlert } from '../utils';

const DemoScreen = () => {
  return (
    <Button
      borderColor={colors.primary}
      onLongPress={() =>
        showAlert('Button Long Press!', 'This is custom message')
      }
      onPress={() => showAlert('Button Press!', 'This is custom message')}
      startIcon={<SvgIcon color={colors.white} name="plus" size={scale(14)} />}
      startIconStyle={{
        marginRight: 0,
      }}
      style={{
        gap: 10,
      }}
      title="Add Title"
      titleStyle={{
        fontSize: fontSize._16,
      }}
    />
  );
};

export default DemoScreen;

`;

export const BUTTON_END_ICON_SAMPLE = `
import React from 'react';
import { Button, SvgIcon } from '@kietpt2003/react-native-core-ui';
import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes';
import { scale } from '@kietpt2003/react-native-core-ui/utils';

import { showAlert } from '../utils';

const DemoScreen = () => {
  return (
    <Button
      borderColor={colors.primary}
      onLongPress={() =>
        showAlert('Button Long Press!', 'This is custom message')
      }
      onPress={() => showAlert('Button Press!', 'This is custom message')}
      endIcon={<SvgIcon color={colors.white} name="plus" size={scale(14)} />}
      endIconStyle={{
        marginLeft: 0,
      }}
      style={{
        gap: 10,
      }}
      title="Play Song"
      titleStyle={{
        fontSize: fontSize._16,
      }}
    />
  );
};

export default DemoScreen;

`;

export const BUTTON_OUTLINE_SAMPLE = `
import React from 'react';
import { Button } from '@kietpt2003/react-native-core-ui';
import { colors } from '@kietpt2003/react-native-core-ui/themes';

import { showAlert } from '../utils';

const DemoScreen = () => {
  return (
    <Button
      borderColor={colors.primary}
      onLongPress={() =>
        showAlert('Button Long Press!', 'This is custom message')
      }
      onPress={() => showAlert('Button Press!', 'This is custom message')}
      title="Click me"
      variant="outline"
    />
  );
};

export default DemoScreen;

`;

export const BUTTON_DISABLE_SAMPLE = `
import React from 'react';
import { Button } from '@kietpt2003/react-native-core-ui';

import { showAlert } from '../utils';

const DemoScreen = () => {
  return (
    <Button
      onLongPress={() =>
        showAlert('Button Long Press!', 'This is custom message')
      }
      onPress={() => showAlert('Button Press!', 'This is custom message')}
      title="Add Title"
      disabled
    />
  );
};

export default DemoScreen;

`;

export const BUTTON_SUBMIT_SAMPLE = `
import React from 'react';
import { Button } from '@kietpt2003/react-native-core-ui';

import { showAlert } from '../utils';

const DemoScreen = () => {
  return (
    <Button
      onLongPress={() =>
        showAlert('Button Long Press!', 'This is custom message')
      }
      onPress={() => showAlert('Button Press!', 'This is custom message')}
      title="Add Title"
      disabled
      isSubmit
    />
  );
};

export default DemoScreen;

`;

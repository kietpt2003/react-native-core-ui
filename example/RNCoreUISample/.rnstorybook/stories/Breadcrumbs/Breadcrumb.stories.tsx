import type { Meta, StoryObj } from '@storybook/react';
import { StyleSheet, View } from 'react-native';
import { fn } from 'storybook/test';
import { Breadcrumb, SvgIcon, Text } from '@kietpt2003/react-native-core-ui'
import { colors } from '@kietpt2003/react-native-core-ui/themes';
import { WEB } from '@kietpt2003/react-native-core-ui/utils';

import { showAlert } from '../../../src/utils';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  }
})

const basicSamples = [
  {
    item: 'Estuary Solutions',
    onPress: fn(() => showAlert('Estuary Solutions Press!', 'This is custom message')),
    disabled: true
  },
  {
    item: 'Services',
    onPress: fn(() => showAlert('Services Press!', 'This is custom message')),
    disabled: true
  },
  {
    item: 'E-Learning Platform',
    onPress: fn(() => showAlert('E-Learning Press!', 'This is custom message'))
  },
]

const sampleWithIcons = [
  {
    item: <View style={styles.itemContainer}>
      <SvgIcon name='home' size={WEB ? 25 : 18} />
      <Text>Estuary Solutions</Text>
    </View>,
    onPress: fn(() => showAlert('Estuary Solutions Press!', 'This is custom message')),
    disabled: true
  },
  {
    item: 'Services',
    onPress: fn(() => showAlert('Services Press!', 'This is custom message')),
    disabled: true
  },
  {
    item: 'E-Learning Platform',
    onPress: fn(() => showAlert('E-Learning Press!', 'This is custom message'))
  },
]

const samplePressable = [
  {
    item: 'Estuary Solutions',
    onPress: fn(() => showAlert('Estuary Solutions Press!', 'This is custom message')),
    disabled: false
  },
  {
    item: 'Services',
    onPress: fn(() => showAlert('Services Press!', 'This is custom message')),
    disabled: false
  },
  {
    item: 'E-Learning Platform',
    onPress: fn(() => showAlert('E-Learning Press!', 'This is custom message')),
    disabled: false
  },
]

const customSample = [
  {
    item: <SvgIcon name='home' size={WEB ? 25 : 18} />,
    onPress: fn(() => showAlert('Estuary Solutions Press!', 'This is custom message')),
    disabled: false
  },
  {
    item: <Text color={colors.gray_7E7E7E}>Services</Text>,
    onPress: fn(() => showAlert('Services Press!', 'This is custom message')),
    disabled: false
  },
  {
    item: <Text color={colors.gray_7E7E7E}>E-Learning Platform</Text>,
    onPress: fn(() => showAlert('E-Learning Press!', 'This is custom message')),
    disabled: true
  },
]

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    items: {
      name: 'items',
      description: 'The routing stack information of router. Note: Default will disable last item, if you want to control last item, please provide disable prop in last item',
      table: {
        defaultValue: {
          summary: 'undefined'
        },
        type: {
          summary: 'Type',
          detail: 'BreadcrumbItem[]\nundefined',
        },
      },
      control: { type: 'select' },
      options: ['Basic Usage', 'With Icons', 'Icon Separator'],
      mapping: {
        'Basic Usage': basicSamples,
        'With Icons': sampleWithIcons,
        'Icon Separator': basicSamples,
      },
    },
    separator: {
      name: 'separator',
      description: 'Custom separator',
      table: {
        defaultValue: {
          summary: '>'
        },
        type: {
          summary: 'Type',
          detail: 'string\nReactNode\nundefined',
        },
      },
      control: { type: 'select' },
      options: ['With String', 'With Icons'],
      mapping: {
        'With String': '-',
        'With Icons': <SvgIcon name='angle-right' color={colors.gray_7E7E7E} size={WEB ? 25 : 18} />,
      },
    },
  }
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Basic Usage',
  args: {
    items: basicSamples
  },
};

export const IconSample: Story = {
  name: 'With Icons',
  args: {
    items: sampleWithIcons,
  },
};

export const SeparatorSample: Story = {
  name: 'Configuring The Separator',
  args: {
    items: basicSamples,
    separator: <SvgIcon name='angle-right' color={colors.gray_7E7E7E} size={WEB ? 25 : 18} />
  },
};

export const PressableSample: Story = {
  name: 'Pressable Separator',
  args: {
    items: samplePressable,
    separator: <SvgIcon name='angle-right' color={colors.gray_7E7E7E} size={WEB ? 25 : 18} />
  },
};

export const CustomSample: Story = {
  name: 'Custom Separator',
  args: {
    items: customSample,
    separator: <SvgIcon name='angle-right' color={colors.gray_7E7E7E} size={WEB ? 25 : 18} />
  },
};

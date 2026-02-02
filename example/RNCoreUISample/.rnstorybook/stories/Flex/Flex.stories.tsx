
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Flex } from '@estuary/rn-core-ui';
import { colors } from '@estuary/rn-core-ui/themes';

import { Box } from '../../../src/components/Flex';

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: colors.white }}>
        <Story />
      </View>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'Switch between row and column layout',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    wrap: {
      control: 'boolean',
      description: 'Enable flex wrapping',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    gap: {
      control: { type: 'number', min: 0, step: 4 },
      description: 'Gap between children',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
    align: {
      control: 'select',
      options: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline'],
      description: 'Align items on the cross axis',
      table: {
        defaultValue: {
          summary: 'stretch',
        },
      },
    },
    justify: {
      control: 'select',
      options: [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly',
      ],
      description: 'Justify items on the main axis',     
      table: {
        defaultValue: {
          summary: 'flex-start',
        },
      },
    },
    flex: {
      control: 'number',
      description: 'Flex grow value',
      table: {
        defaultValue: {
          summary: '0',
        },
      },
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  argTypes: {
    vertical: {
      control: 'radio',
      options: [false, true],
      labels: {
        false: 'horizontal',
        true: 'vertical',
      },
    },
  },
  args: {
    vertical: false,
    gap: 8,
    flex: 0,
  },
  render: args => (
    <View
      style={{
        margin: 12,
        marginHorizontal: 12,
        width: '100%',
        maxWidth: 300,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.gray_EEEEEE,
        borderRadius: 8,
      }}
    >
      <Flex gap={8} {...args}>
        <Box label="A" height={30} width={30} />
        <Box label="B" height={50} width={50} />
        <Box label="C" height={65} width={65} />
        <Box label="D" height={80} width={80} />
      </Flex>
    </View>
  ),
};

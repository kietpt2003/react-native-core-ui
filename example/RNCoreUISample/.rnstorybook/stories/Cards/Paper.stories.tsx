import type { Meta, StoryObj } from '@storybook/react';
import { View, ViewStyle } from 'react-native';
import { Paper, SvgIcon, Text } from '@kietpt2003/react-native-core-ui';
import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes';
import { PaperElevation } from '@kietpt2003/react-native-core-ui/Cards/Paper';

import { booleanOptional, numberOptional, stringOptional } from '../../../src/types/types';

const baseStyle: ViewStyle = {
  width: 128,
  aspectRatio: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

const elevations: PaperElevation[] = [0, 1, 2, 3, 4, 6, 8, 12, 16, 24]

const meta = {
  title: 'Surfaces/Paper',
  component: Paper,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      name: 'elevation',
      description: "Use the elevation prop to establish hierarchy through the use of shadows. The Paper component's default elevation level is 1. The prop accepts values from 0 to 24. The higher the number, the further away the Paper appears to be from its background.",
      type: numberOptional,
      table: {
        category: 'Customization',
        defaultValue: {
          summary: '1'
        },
      },
      control: { type: 'select' },
      options: elevations,
    },
    square: {
      name: 'square',
      description: "The Paper component features rounded corners by default. Add the square prop for square corners",
      type: booleanOptional,
      table: {
        category: 'Customization',
        defaultValue: {
          summary: 'false'
        },
      },
    },
    variant: {
      name: 'variant',
      description: 'Set the variant prop to "outlined" for a flat, outlined Paper with no shadows',
      type: stringOptional,
      table: {
        category: 'Customization',
        defaultValue: {
          summary: 'elevation'
        },
      },
      control: { type: 'select' },
      options: ['elevation', 'outlined'],
    },
    style: {
      name: 'style',
      description: 'For apply styles for paper component',
      table: {
        category: 'Styles',
        defaultValue: {
          summary: '{}'
        },
        type: {
          summary: 'Type',
          detail: 'StyleProp<ViewStyle>\nundefined',
        },
      },
      control: {
        type: 'object'
      }
    },
    children: {
      name: 'children',
      description: 'For apply children component',
      table: {
        category: 'React Node',
        defaultValue: {
          summary: ''
        },
        type: {
          summary: 'Type',
          detail: 'ReactNode\nundefined',
        },
      },
      control: { type: 'select' },
      options: ['Default', 'Text', 'PlayCircle'],
      mapping: {
        Default: undefined,
        Text: <Text numberOfLines={2} color={colors.black} style={{
          textAlign: 'center',
          fontSize: fontSize._14
        }}>Estuary</Text>,
        PlayCircle: <SvgIcon name='play-circle' />,
      },
    },
  }
} satisfies Meta<typeof Paper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    elevation: 1,
    square: false,
    variant: 'elevation',
    style: {
      ...baseStyle,
      backgroundColor: colors.white_80,
    }
  },
}

export const Elevation: Story = {
  name: 'Elevation',
  args: {
    style: {
      ...baseStyle,
      backgroundColor: colors.white_80
    }
  },
  render: (args) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 30 }}>
      {elevations.map((item, i) => (
        <Paper
          key={i}
          {...args}
          elevation={item}
        >
          <Text numberOfLines={2} color={colors.black} style={{
            textAlign: 'center',
            fontSize: fontSize._14
          }}>elevation={item}</Text>
        </Paper>
      ))}
    </View>
  )
};

export const Variants: Story = {
  name: 'Variants',
  args: {
    elevation: 1,
    variant: 'elevation',
    style: {
      ...baseStyle,
      backgroundColor: colors.white_80,
    }
  },
  render: (args) => (
    <View style={{ flexDirection: 'row', gap: 20 }}>
      <Paper {...args}>
        <Text color={colors.black} style={{
          textAlign: 'center'
        }}>default variant</Text>
      </Paper>
      <Paper {...args} variant='outlined'>
        <Text color={colors.black} style={{
          textAlign: 'center'
        }}>outlined variant</Text>
      </Paper>
    </View>
  ),
};

export const Corners: Story = {
  name: 'Corners',
  args: {
    elevation: 1,
    square: false,
    variant: 'elevation',
    style: {
      ...baseStyle,
      backgroundColor: colors.primary,
    }
  },
  render: (args) => (
    <View style={{ flexDirection: 'row', gap: 20 }}>
      <Paper {...args}>
        <Text color={colors.white} style={{
          textAlign: 'center'
        }}>rounded corners</Text>
      </Paper>
      <Paper {...args} square={true}>
        <Text color={colors.white} style={{
          textAlign: 'center'
        }}>square corners</Text>
      </Paper>
    </View>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { View, ViewStyle } from 'react-native';
import { Paper, SvgIcon, Text, Badge } from '@estuary/rn-core-ui';
import { colors, fontSize } from '@estuary/rn-core-ui/themes';
import { BadgeProps, BadgeVariant } from '@estuary/rn-core-ui/Badges/Badge';

import { booleanOptional, numberOptional, stringOptional } from '../../../src/types/types';

const tmpBadgeContents = [1, 1, 0, 0];
const tmpBadgeContentsNextGen = [99, 100, 1000];
const tmpBadgeAlignment: {
    variant?: BadgeVariant
    badgeContent?: number | string
    max?: number
}[] = [
  {
    variant: 'dot',
    badgeContent: 1,
    max: 99
  },
  {
    variant: 'standard',
    badgeContent: 1,
    max: 99
  },
  {
    variant: 'standard',
    badgeContent: 12,
    max: 99
  },
  {
    variant: 'standard',
    badgeContent: 100,
    max: 99
  },
  {
    variant: 'standard',
    badgeContent: 1000,
    max: 999
  },
]

const Rect = () => {
  return <View style={{width: 68, aspectRatio: 1, backgroundColor: colors.yellow_EDDE5D}}/>
}

const Circle = () => {
  return (
    <View style={{ width: 68, aspectRatio: 1, backgroundColor: colors.gray_BCBCBC }}>
      <View style={{ width: 68, aspectRatio: 1, borderRadius: 68 / 2, backgroundColor: colors.yellow_EDDE5D }}></View>
    </View>
  )
}

const meta = {
  title: 'Data Display/Badge',
  component: Badge,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
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
      options: ['AlertCircle', 'PlayCircle'],
      mapping: {
        AlertCircle: <SvgIcon name='alert-circle' />,
        PlayCircle: <SvgIcon name='play-circle' />,
      },
    },
    badgeContent: {
      name: 'badgeContent',
      description: 'The content rendered within the badge.',
      table: {
        category: 'Content',
        defaultValue: {
          summary: ''
        },
        type: {
          summary: 'Type',
          detail: 'string\nnumber\nundefined',
        },
      },
      control: { type: 'select' },
      options: [
        'I like this styles',
        0,
        1,
        9, 
        99, 
        999,
        1000
      ],
    },
    max: {
      name: 'max',
      description: 'Max count to show.',
      type: numberOptional,
      table: {
        category: 'Props',
        defaultValue: {
          summary: '99'
        },
        type: {
          summary: 'Type',
          detail: 'number\nundefined',
        },
      },
    },
    showZero: {
      name: 'showZero',
      description: 'Controls whether the badge is hidden when badgeContent is zero.',
      type: booleanOptional,
      table: {
        category: 'Props',
        defaultValue: {
          summary: '99'
        },
        type: {
          summary: 'Type',
          detail: 'number\nundefined',
        },
      },
    },
    invisible: {
      name: 'invisible',
      description: 'If true, the badge is invisible.',
      type: booleanOptional,
      table: {
        category: 'Props',
        defaultValue: {
          summary: 'false'
        },
        type: {
          summary: 'Type',
          detail: 'boolean\nundefined',
        },
      },
    },
    color: {
      name: 'color',
      description: 'The color of the component.',
      type: stringOptional,
      table: {
        category: 'Props',
        defaultValue: {
          summary: colors.primary
        },
        type: {
          summary: 'Type',
          detail: 'color\nundefined',
        },
      },
      control: 'color'
    },
    variant: {
      name: 'variant',
      description: 'The variant to use.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: 'standard'
        },
        type: {
          summary: 'Type',
          detail: 'string\nundefined',
        },
      },
      control: { type: 'select' },
      options: ['standard', 'dot'],
    },
    overlap: {
      name: 'overlap',
      description: 'Wrapped shape the badge should overlap.',
      table: {
        category: 'Props',
        defaultValue: {
          summary: 'rectangular'
        },
        type: {
          summary: 'Type',
          detail: 'string\nundefined',
        },
      },
      control: { type: 'select' },
      options: ['rectangular', 'circular'],
    },
    anchorOrigin: {
      name: 'anchorOrigin',
      description: 'The anchor of the badge.',
      table: {
        category: 'React Node',
        defaultValue: {
          summary: "{ vertical: 'top', horizontal: 'right' }"
        },
        type: {
          summary: 'Type',
          detail: "{\n horizontal?: 'left' | 'right',\n vertical?: 'bottom' | 'top'\n}",
        },
      },
      control: { type: 'object' }
    },
    style: {
      name: 'style',
      description: 'For apply styles for wrap component',
      table: {
        category: 'Content',
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
    badgeStyle: {
      name: 'badgeStyle',
      description: 'For apply styles for the badge',
      table: {
        category: 'Content',
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
    contentStyle: {
      name: 'contentStyle',
      description: 'For apply styles for content insdie badge',
      table: {
        category: 'Content',
        defaultValue: {
          summary: '{}'
        },
        type: {
          summary: 'Type',
          detail: 'StyleProp<TextStyle>\nundefined',
        },
      },
      control: {
        type: 'object'
      }
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Basic badge',
  args: {
    badgeContent: 4,
    children: <SvgIcon name='alert-circle' />
  },
  render: (args) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Badge
        {...args}
      >
        {args.children}
      </Badge>
    </View>
  )
}

export const Customization: Story = {
  name: 'Customization',
  args: {
    badgeContent: 4,
    color: colors.green_266432,
    badgeStyle: {
      right: -3,
      top: 23
    },
    children: <SvgIcon name='alert-circle' />
  },
  render: (args) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Badge
        {...args}
      >
        {args.children}
      </Badge>
    </View>
  )
};

export const Visibility: Story = {
  name: 'Badge visibility',
  args: {
    children: <SvgIcon name='alert-circle' />
  },
  render: (args) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 30 }}>
      {tmpBadgeContents.map((item, i) => (
        <Badge
          key={i}
          {...args}
          invisible={i !== 1 ? false : args.invisible}
          variant={i !== 1 ? 'standard' : 'dot'}
          badgeContent={item}
          showZero={i === 3 ? true : args.showZero}
        >
          {args.children}
        </Badge>
      ))}
    </View>
  )
};

export const Maximum: Story = {
  name: 'Maximum value',
  args: {
    children: <SvgIcon name='alert-circle' />
  },
  render: (args) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 30 }}>
      {tmpBadgeContentsNextGen.map((item, i) => (
        <Badge
          key={i}
          {...args}
          badgeContent={item}
          max={i === 2 ? 999 : args.max}
        >
          {args.children}
        </Badge>
      ))}
    </View>
  )
};

export const Dot: Story = {
  name: 'Dot badge',
  args: {
    badgeContent: 1,
    variant: 'dot',
    children: <SvgIcon name='alert-circle' />
  },
  render: (args) => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Badge
        {...args}
      >
        {args.children}
      </Badge>
    </View>
  )
};

export const Overlap: Story = {
  name: 'Badge overlap',
  args: {
    badgeContent: '1',
    children: <></>
  },
  render: (args) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 30 }}>
      {tmpBadgeContents.map((item, i) => (
        <Badge
          key={i}
          {...args}
          variant={i % 2 ? 'dot' : 'standard'}
          overlap={i === 2 || i === 3 ? 'circular' : args.overlap}
        >
          {i === 0 || i === 1 ?
            <Rect /> :
            <Circle/>  
          }
        </Badge>
      ))}
    </View>
  )
};

export const Alignment: Story = {
  name: 'Badge alignment',
  argTypes: {
    anchorOrigin: {
      name: 'anchorOrigin',
      description: 'The anchor of the badge.',
      table: {
        category: 'React Node',
        defaultValue: {
          summary: "{ vertical: 'top', horizontal: 'right' }"
        },
        type: {
          summary: 'Type',
          detail: "{\n horizontal?: 'left' | 'right',\n vertical?: 'bottom' | 'top'\n}",
        },
      },
      control: { type: 'select' },
      options: ['TopRight', 'BottomRight', 'BottomLeft', 'TopLeft'],
      mapping: {
        TopRight: {
          vertical: 'top',
          horizontal: 'right'
        },
        BottomRight: {
          vertical: 'bottom',
          horizontal: 'right'
        },
        BottomLeft: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        TopLeft: {
          vertical: 'top',
          horizontal: 'left'
        }
      }
    },
  },
  args: {
    badgeContent: '1',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    children: <SvgIcon name='alert-circle' />
  },
  render: (args) => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 30 }}>
      {tmpBadgeAlignment.map((item, i) => (
        <Badge
          key={i}
          {...args}
          invisible={false}
          variant={item.variant}
          badgeContent={item.badgeContent}
          max={item.max}
        >
          {args.children}
        </Badge>
      ))}
    </View>
  )
};

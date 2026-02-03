import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { fn } from 'storybook/test';
import { Button, SvgIcon } from '@kietpt2003/react-native-core-ui'
import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes';

import { showAlert } from '../../../src/utils';
import {
  booleanOptional,
  stringOptional,
} from '../../../src/types/types'

const meta = {
  title: 'Inputs/Button',
  component: Button,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Story />
      </View>
    ),
  ],
  tags: ['autodocs'],
  args: {
    onPress: fn(() => showAlert('Button Press!', 'This is custom message')),
    onPressIn: fn(() => console.log('Button press in!')),
    onPressOut: fn(() => console.log('Button press out!')),
    onLongPress: fn(() => showAlert('Button Long Press!', 'This is custom message')),
  },
  argTypes: {
    title: {
      name: 'title',
      description: 'Provide button title',
      type: stringOptional,
      table: {
        category: 'Content',
        defaultValue: {
          summary: ''
        },
      },
    },
    startIcon: {
      name: 'startIcon',
      description: 'For adding start component or an Icon',
      table: {
        category: 'React Node',
        defaultValue: {
          summary: 'undefined'
        },
        type: {
          summary: 'Type',
          detail: 'ReactNode\nundefined',
        },
        subcategory: 'Start'
      },
      control: { type: 'select' },
      options: ['Default', 'IconPlus', 'PlayCircle'],
      mapping: {
        Default: undefined,
        IconPlus: <SvgIcon name='plus' />,
        PlayCircle: <SvgIcon name='play-circle' />,
      },
    },
    startIconStyle: {
      name: 'startIconStyle',
      description: 'For apply styles for start component',
      table: {
        category: 'React Node',
        defaultValue: {
          summary: '{}'
        },
        type: {
          summary: 'Type',
          detail: 'StyleProp<ViewStyle>\nundefined',
        },
        subcategory: 'Start',
      },
      control: {
        type: 'object'
      }
    },
    endIcon: {
      name: 'endIcon',
      description: 'For adding end component or an Icon',
      table: {
        category: 'React Node',
        defaultValue: {
          summary: 'undefined'
        },
        type: {
          summary: 'Type',
          detail: 'ReactNode\nundefined',
        },
        subcategory: 'End'
      },
      control: { type: 'select' },
      options: ['Default', 'IconPlus', 'PlayCircle'],
      mapping: {
        Default: undefined,
        IconPlus: <SvgIcon name='plus' />,
        PlayCircle: <SvgIcon name='play-circle' />,
      },
    },
    endIconStyle: {
      name: 'endIconStyle',
      description: 'For apply styles for end component',
      table: {
        category: 'React Node',
        defaultValue: {
          summary: '{}'
        },
        type: {
          summary: 'Type',
          detail: 'StyleProp<ViewStyle>\nundefined',
        },
        subcategory: 'Start',
      },
      control: {
        type: 'object'
      }
    },
    style: {
      name: 'style',
      description: 'For apply styles for button component',
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
    titleStyle: {
      name: 'titleStyle',
      description: 'For apply styles for text inside button',
      table: {
        category: 'Styles',
        defaultValue: {
          summary: '{}'
        },
        type: {
          summary: 'Type',
          detail: 'StyleProp<TextStyle>\nundefined',
        },
        subcategory: 'Title'
      },
      control: {
        type: 'object'
      }
    },
    activeBgColor: {
      name: 'activeBgColor',
      description: 'This prop provide active color for easily styling',
      type: stringOptional,
      table: {
        category: 'Styles',
        defaultValue: {
          summary: colors.primary
        },
        subcategory: 'Background Colors'
      },
      control: {
        type: 'color'
      }
    },
    inactiveBgColor: {
      name: 'inactiveBgColor',
      description: 'This prop provide inactive color for easily styling',
      type: stringOptional,
      table: {
        category: 'Styles',
        defaultValue: {
          summary: colors.gray_B3B3B3
        },
        subcategory: 'Background Colors'
      },
      control: {
        type: 'color'
      }
    },
    disabled: {
      name: 'disabled',
      description: 'If true, disable all interactions for this component.',
      type: booleanOptional,
      table: {
        category: 'Actions',
        defaultValue: {
          summary: 'false'
        },
      },
      control: {
        type: 'boolean'
      }
    },
    isSubmit: {
      name: 'isSubmit',
      description: 'This prop provide showing loading button',
      type: booleanOptional,
      table: {
        category: 'Actions',
        defaultValue: {
          summary: 'false'
        },
      },
      control: {
        type: 'boolean'
      }
    },
    indicatorSize: {
      name: 'indicatorSize',
      description: 'This prop provide showing loading indicator size when isSubmit === true',
      table: {
        category: 'Actions',
        defaultValue: {
          summary: 'small'
        },
      },
      options: ['default', 'small', 'large', 'number(50)'],
      mapping: {
        default: 'small',
        small: 'small',
        large: 'large',
        number: 50
      },
      control: {
        type: 'select'
      }
    },
    onPress: {
      name: 'onPress',
      description: 'Called when the touch is released, but not if cancelled (e.g. by a scroll that steals the responder lock).',
      table: {
        category: 'Actions',
        defaultValue: {
          summary: 'undefined'
        },
      },
    },
    onPressIn: {
      name: 'onPressIn',
      description: 'Called when pointer press in the button',
      table: {
        category: 'Actions',
        defaultValue: {
          summary: 'undefined'
        },
      },
    },
    onPressOut: {
      name: 'onPressOut',
      description: 'Called when pointer out out the button',
      table: {
        category: 'Actions',
        defaultValue: {
          summary: 'undefined'
        },
      },
    },
    onLongPress: {
      name: 'onLongPress',
      description: 'Called when long press',
      table: {
        category: 'Actions',
        defaultValue: {
          summary: 'undefined'
        },
      },
    },
    variant: {
      name: 'variant',
      description: 'This prop provide styling button',
      table: {
        category: 'Styles',
        defaultValue: {
          summary: 'filled'
        },
      },
      options: ['filled', 'outline'],
      mapping: {
        filled: 'filled',
        outline: 'outline',
      },
      control: {
        type: 'select'
      }
    },
    borderColor: {
      name: 'borderColor',
      type: stringOptional,
      description: 'Provide borderColor for button',
      table: {
        category: 'Styles',
        defaultValue: {
          summary: colors.primary
        },
        subcategory: 'Background Colors'
      },
      control: {
        type: 'color'
      }
    },
    titleProps: {
      name: 'titleProps',
      description: 'For apply title props inside button',
      table: {
        category: 'Styles',
        defaultValue: {
          summary: '{}'
        },
        type: {
          summary: 'Type',
          detail: 'TextProps\nundefined',
        },
        subcategory: 'Title'
      },
      control: {
        type: 'object'
      }
    },
  }
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeBgColor: colors.primary,
    inactiveBgColor: colors.gray_B3B3B3,
    variant: 'filled',
    borderColor: colors.primary,
  },
};

export const StartIcon: Story = {
  name: 'Button With Start Icon',
  args: {
    title: 'Add Title',
    startIcon: <SvgIcon size={fontSize._18} name='plus' color={colors.white} />,
    startIconStyle: {
      marginRight: 0
    },
    titleStyle: {
      fontSize: fontSize._16
    },
    style: {
      gap: 10,
    },
    borderColor: colors.primary,
  },
};

export const EndIcon: Story = {
  name: 'Button With End Icon',
  args: {
    title: 'Play Song',
    endIcon: <SvgIcon size={fontSize._18} name='play-circle' color={colors.white} />,
    endIconStyle: {
      marginLeft: 0
    },
    titleStyle: {
      fontSize: fontSize._16
    },
    style: {
      gap: 10,
    },
    borderColor: colors.primary,
  },
};

export const Outline: Story = {
  name: 'Button Outline',
  args: {
    title: 'Click me',
    variant: 'outline',
    borderColor: colors.primary,
  },
};

export const Disable: Story = {
  name: 'Disable Button',
  args: {
    title: 'Add Title',
    disabled: true,
  },
};

export const Submit: Story = {
  name: 'Submit Button',
  args: {
    title: 'Add Title',
    disabled: true,
    isSubmit: true,
  },
};
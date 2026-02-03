import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes'
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import { Text } from '@kietpt2003/react-native-core-ui';

import {
  booleanOptional,
  stringOptional,
  numberOptional
} from '../../../src/types/types'
import { TEXT_BOLD_SAMPLE, TEXT_DEFAULT_SAMPLE } from '../../../src/components/Texts/Samples/Data';

const meta = {
  title: 'Inputs/Text',
  component: Text,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Story />
      </View>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // Use `fn` to spy on the onPress arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  argTypes: {
    bold: {
      name: 'bold',
      description: 'For bold text',
      type: booleanOptional,
      table: {
        category: 'Font Weight',
        defaultValue: {
          summary: 'false'
        },
      }
    },
    color: {
      name: 'color',
      description: 'For change text color',
      type: stringOptional,
      table: {
        category: 'Colors',
        defaultValue: {
          summary: colors.black
        },
      },
      control: 'color'
    },
    italic: {
      name: 'italic',
      description: 'For italic text',
      type: booleanOptional,
      table: {
        category: 'Font Styles',
        defaultValue: {
          summary: 'false'
        },
      }
    },
    light: {
      name: 'light',
      description: 'For light text',
      type: booleanOptional,
      table: {
        category: 'Font Weight',
        defaultValue: {
          summary: 'false'
        },
      }
    },
    medium: {
      name: 'medium',
      description: 'For medium text',
      type: booleanOptional,
      table: {
        category: 'Font Weight',
        defaultValue: {
          summary: 'false'
        },
      }
    },
    semiBold: {
      name: 'semiBold',
      description: 'For semi bold text',
      type: booleanOptional,
      table: {
        category: 'Font Weight',
        defaultValue: {
          summary: 'false'
        },
      }
    },
    size: {
      name: 'size',
      description: 'For change text size',
      type: numberOptional,
      table: {
        category: 'Font Size',
        defaultValue: {
          summary: 'fontSize._16'
        },
      }
    },
    thin: {
      name: 'thin',
      description: 'For thin text',
      type: booleanOptional,
      table: {
        category: 'Font Weight',
        defaultValue: {
          summary: 'false'
        },
      }
    },
    children: {
      name: 'children',
      description: 'For change text description',
      control: { type: 'text' },
      table: {
        category: 'Content',
        defaultValue: {
          summary: ''
        },
        type: {
          summary: 'Type',
          detail: 'string\nundefined\nReactNode',
        }
      },
    },
  },
  parameters: {
    range: {
      size: { type: "number", min: 10, max: 50, step: 1 }
    },
    docs: {
      description: {
        component:
          `A reusable text component that extends React Native's \`Text\`, supporting font size, color, weight variants, and italic styling for consistent typography across the app.`,
      },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: {
    bold: false,
    color: colors.black,
    italic: false,
    light: false,
    medium: false,
    semiBold: false,
    size: fontSize._16,
    thin: false,
    children: 'This is default content. You can change this if you want.'
  },
  parameters: {
    docs: {
      description: {
        story:
          `Displays text with default styling. Use this as the baseline for typography.`,
      },
      source: {
        code: TEXT_DEFAULT_SAMPLE,
      },
    },
  },
}

export const Bold: Story = {
  name: 'Bold',
  args: {
    bold: true,
    children: 'This is bold content. You can change this if you want.'
  },
  parameters: {
    docs: {
      description: {
        story:
          `Renders text with a bold font weight for strong emphasis.`,
      },
      source: {
        code: TEXT_BOLD_SAMPLE,
      },
    },
  },
};

export const SemiBold: Story = {
  name: 'Semi Bold',
  args: {
    semiBold: true,
    children: 'This is semi bold content. You can change this if you want.'
  },
  parameters: {
    docs: {
      description: {
        story:
          `Displays text with a semi-bold font weight for medium emphasis.`,
      },
    },
  },
};

export const Medium: Story = {
  name: 'Medium',
  args: {
    medium: true,
    children: 'This is default content. You can change this if you want.'
  },
  parameters: {
    docs: {
      description: {
        story:
          `Uses a medium font weight, suitable for labels or secondary emphasis.`,
      },
    },
  },
};

export const Light: Story = {
  name: 'Light',
  args: {
    light: false,
    children: 'This is light content. You can change this if you want.'
  },
  parameters: {
    docs: {
      description: {
        story:
          `Renders text with a light font weight for subtle or less prominent content.`,
      },
    },
  },
};

export const Thin: Story = {
  name: 'Thin',
  args: {
    thin: true,
    children: 'This is thin content. You can change this if you want.'
  },
  parameters: {
    docs: {
      description: {
        story:
          `Displays text with a very thin font weight for minimal visual emphasis.`,
      },
    },
  },
};

export const Italic: Story = {
  name: 'Italic',
  args: {
    italic: true,
    children: 'This is italic content. You can change this if you want.'
  },
  parameters: {
    docs: {
      description: {
        story:
          `Renders italic text, commonly used for quotes or emphasis.`,
      },
    },
  },
};

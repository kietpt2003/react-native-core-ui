import type { Meta, StoryObj } from '@storybook/react';
import { View, TouchableOpacity } from 'react-native';
import { TextField, Text, SvgIcon, Button } from '@estuary/rn-core-ui';
import { colors, fontSize } from '@estuary/rn-core-ui/themes';
import { fn } from 'storybook/internal/test';
import React from 'react';

import { showAlert } from '../../../src/utils';
import { BASIC_INPUT_SAMPLE, CORRECT_INPUT_MULTILINE_SAMPLE, INPUT_CONTROLLED_SAMPLE, INPUT_CUSTOM_COLOR_SAMPLE, INPUT_DISABLE_SAMPLE, INPUT_FLOATING_LABEL_SAMPLE, INPUT_FORM_SAMPLE, INPUT_LABEL_SIZE_SAMPLE, INPUT_MULTILINE_SAMPLE, INPUT_WITH_ERROR_SAMPLE, INPUT_WITH_HELPER_SAMPLE, INPUT_WITH_ICON_SAMPLE, WRONG_INPUT_MULTILINE_SAMPLE } from '../../../src/components/TextField/Samples/Data';

const meta = {
  title: 'Inputs/TextField',
  component: TextField,
  decorators: [
    Story => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 40 }}>
        <View style={{ width: '100%', maxWidth: 400 }}>
          <Story />
        </View>
      </View>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A customizable text input component with floating labels, error handling, helper text, and icon support.',
      },
    },
  },
  argTypes: {
    label: {
      name: 'label',
      description: 'Floating label text displayed above the input',
      table: {
        category: 'Label',
        type: {
          summary: 'string',
        },
      },
      control: 'text',
    },
    labelSize: {
      name: 'labelSize',
      description: 'Font size of the label when floating',
      table: {
        category: 'Label',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '14',
        },
      },
      control: { type: 'number', min: 10, max: 24 },
    },
    labelMinSize: {
      name: 'labelMinSize',
      description: 'Minimum font size of the label when contracted',
      table: {
        category: 'Label',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '12',
        },
      },
      control: { type: 'number', min: 10, max: 20 },
    },
    applyTopLabel: {
      name: 'applyTopLabel',
      description: 'Whether to animate the label to the top when focused or has value',
      table: {
        category: 'Label',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
      control: 'boolean',
    },
    labelBackground: {
      name: 'labelBackground',
      description: 'Background color of the floating label. This work perfectly if set the same background color with input background. Please do not set to *transparent*, its makes no sense!!',
      table: {
        category: 'Label',
        type: {
          summary: 'string',
        },
      },
      control: 'color',
    },
    value: {
      name: 'value',
      description: 'Controlled input value',
      table: {
        category: 'State',
        type: {
          summary: 'string',
        },
      },
      control: 'text',
    },
    defaultValue: {
      name: 'defaultValue',
      description: 'Initial uncontrolled input value',
      table: {
        category: 'State',
        type: {
          summary: 'string',
        },
      },
      control: 'text',
    },
    error: {
      name: 'error',
      description: 'Error state - can be boolean or error message string',
      table: {
        category: 'Validation',
        type: {
          summary: 'boolean | string',
        },
        defaultValue: {
          summary: 'false',
        },
      },
      control: 'text',
    },
    errorColor: {
      name: 'errorColor',
      description: 'Custom color for error state',
      table: {
        category: 'Validation',
        type: {
          summary: 'string',
        },
      },
      control: 'color',
    },
    focusedColor: {
      name: 'focusedColor',
      description: 'Custom color when input is focused',
      table: {
        category: 'Styling',
        type: {
          summary: 'string',
        },
      },
      control: 'color',
    },
    helperText: {
      name: 'helperText',
      description: 'Helper text displayed below the input',
      table: {
        category: 'Helper Text',
        type: {
          summary: 'string',
        },
      },
      control: 'text',
    },
    helperTextColor: {
      name: 'helperTextColor',
      description: 'Custom color for helper text',
      table: {
        category: 'Helper Text',
        type: {
          summary: 'string',
        },
      },
      control: 'color',
    },
    renderStartIcon: {
      name: 'renderStartIcon',
      description: 'Function that renders icon at the start of the input. Receives focused, hasError, and editable states.',
      table: {
        category: 'Icons',
        type: {
          summary: '(params: RenderIconParams) => React.ReactNode',
        },
      },
      control: false,
    },
    renderEndIcon: {
      name: 'renderEndIcon',
      description: 'Function that renders icon at the end of the input. Receives focused, hasError, and editable states.',
      table: {
        category: 'Icons',
        type: {
          summary: '(params: RenderIconParams) => React.ReactNode',
        },
      },
      control: false,
    },
    multiline: {
      name: 'multiline',
      description: 'Enable multiline input',
      table: {
        category: 'Multiline',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
      control: 'boolean',
    },
    rows: {
      name: 'rows',
      description: 'Number of rows for multiline input',
      table: {
        category: 'Multiline',
        type: {
          summary: 'number',
        },
        defaultValue: {
          summary: '3',
        },
      },
      control: { type: 'number', min: 1, max: 10 },
    },
    maxRows: {
      name: 'maxRows',
      description: 'Maximum number of rows for multiline input',
      table: {
        category: 'Multiline',
        type: {
          summary: 'number',
        },
      },
      control: { type: 'number', min: 1, max: 20 },
    },
    editable: {
      name: 'editable',
      description: 'Whether the input is editable',
      table: {
        category: 'State',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
      control: 'boolean',
    },

    containerStyle: {
      name: 'containerStyle',
      description: 'Style applied to the outer container',
      table: {
        category: 'Styling',
        type: {
          summary: 'StyleProp<ViewStyle>',
        },
      },
      control: false,
    },
    inputContainerStyle: {
      name: 'inputContainerStyle',
      description: 'Style applied to the input container',
      table: {
        category: 'Styling',
        type: {
          summary: 'StyleProp<ViewStyle>',
        },
      },
      control: false,
    },
    onChangeText: {
      name: 'onChangeText',
      description: 'Callback fired when text value changes',
      table: {
        category: 'Events',
        type: {
          summary: '(text: string) => void',
        },
      },
      control: false,
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const BasicInput: Story = {
  name: 'Basic Input',
  args: {
    label: 'Full Name',
    onChangeText: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic text input with a floating label.',
      },
      source: {
        code: BASIC_INPUT_SAMPLE,
      },
    },
  },
  render: (args) => {
    const [text, setText] = React.useState('');
    return (
      <TextField
        {...args}
        value={text}
        onChangeText={(t) => {
          setText(t);
          args.onChangeText?.(t);
        }}
      />
    );
  },
};

export const WithHelperText: Story = {
  name: 'With Helper Text',
  args: {
    label: 'Email Address',
    helperText: 'We will never share your email',
    helperTextColor: colors.gray_D1D2D4,
    onChangeText: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with helper text displayed below the field. You can use `helperTextColor` for apply text color easily or `helperTextStyle` for styling.',
      },
      source: {
        code: INPUT_WITH_HELPER_SAMPLE,
      },
    },
  },
  render: (args) => {
    const [text, setText] = React.useState('');
    return (
      <TextField
        {...args}
        value={text}
        onChangeText={(t) => {
          setText(t);
          args.onChangeText?.(t);
        }}
      />
    );
  },
};

export const WithError: Story = {
  name: 'With Error',
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters',
    errorColor: colors.error,
  },
  parameters: {
    docs: {
      description: {
        story: "Input displaying error state with error message. `error` can be a *'string'* or *'boolean'*. If you provide a *'string'* then the helperText will be overided by error content",
      },
      source: {
        code: INPUT_WITH_ERROR_SAMPLE,
      },
    },
  },
  render: (args) => {
    const [text, setText] = React.useState('');
    return (
      <TextField
        {...args}
        error={text?.length < 8 ? 'Password must be at least 8 characters' : false}
        value={text}
        onChangeText={setText}
        secureTextEntry
      />
    );
  },
};

export const WithIcons: Story = {
  name: 'With Icons',
  args: {
    label: 'Search',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with start and end icons that respond to focused and error states. We provides params that included: `focused`, `hasError`, `editable` for setting icon color',
      },
      source: {
        code: INPUT_WITH_ICON_SAMPLE,
      },
    },
  },
  render: (args) => {
    const [text, setText] = React.useState('');
    return (
      <TextField
        {...args}
        value={text}
        onChangeText={setText}
        renderStartIcon={(params) => (
          <TouchableOpacity>
            <SvgIcon
              name={'person'}
              size={20}
              color={params.focused ? colors.primary : colors.gray_D1D2D4}
            />
          </TouchableOpacity>
        )}
      />
    );
  },
};

export const Multiline: Story = {
  name: 'Multiline Input',
  args: {
    label: 'Comments',
    multiline: true,
    rows: 3,
    maxRows: 5,
    onChangeText: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: `
Multiline text input that grows with content up to maxRows.
- Default \`rows\` is 3.
- If you provide \`maxRows\`.*TextField* will auto increase input height until hits maxRows. User need to scroll for seeing input content.
- On Web input placeholder can only be on top. So please \`textAlignVertical\` don't take effect in this case.
**Note:**
- This component use \`onContentSizeChange\` for calculating input height. And retrigger this calculation when *Developer* change the \`style\` props (**Only** some props effect the input height. Ex: fontSize, padding, margin, etc...)
- *Developer* please notice **DO NOT** provide style logical for change fontSize, padding, margin,etc... that will causing looping issues.

**WRONG DEMO**

\`\`\`tsx
` +
          WRONG_INPUT_MULTILINE_SAMPLE +
          `
\`\`\`

**CORRECT DEMO**

\`\`\`tsx
`+
          CORRECT_INPUT_MULTILINE_SAMPLE +
          `
\`\`\`
`,
      },
      source: {
        code: INPUT_MULTILINE_SAMPLE,
      },
    },
  },
  render: (args) => {
    const [text, setText] = React.useState('');
    return (
      <TextField
        {...args}
        value={text}
        onChangeText={(t) => {
          setText(t);
          args.onChangeText?.(t);
        }}
      />
    );
  },
};

export const Disabled: Story = {
  name: 'Disabled Input',
  args: {
    defaultValue: 'Cannot edit this field',
    applyTopLabel: false,
    editable: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input in disabled state with gray background. For beautiful UX/UI, `applyTopLabel` should be *false*. Due to top label will need background color that will support label above the input border without linethrough',
      },
      source: {
        code: INPUT_DISABLE_SAMPLE,
      },
    },
  },
  render: (args) => (
    <TextField {...args} />
  ),
};

export const CustomFocusedColor: Story = {
  name: 'Custom Focused Color',
  args: {
    label: 'Username',
    focusedColor: colors.green_42A046,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with custom color applied when focused. We provide `focusedColor`, `errorColor` and `helperTextColor`. Set what color that you want.',
      },
      source: {
        code: INPUT_CUSTOM_COLOR_SAMPLE,
      },
    },
  },
  render: (args) => {
    const [text, setText] = React.useState('');
    return (
      <TextField
        {...args}
        value={text}
        onChangeText={setText}
      />
    );
  },
};

export const DifferentLabelSizes: Story = {
  name: 'Different Label Sizes',
  args: {
    label: 'Email',
    labelSize: fontSize._14,
    labelMinSize: fontSize._12,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with customized label font sizes.',
      },
      source: {
        code: INPUT_LABEL_SIZE_SAMPLE,
      },
    },
  },
  render: (args) => {
    const [text, setText] = React.useState('');
    return (
      <TextField
        {...args}
        value={text}
        onChangeText={setText}
      />
    );
  },
};

export const WithoutFloatingLabel: Story = {
  name: 'Without Floating Label',
  args: {
    label: 'Static Label',
    applyTopLabel: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a static label that does not float. If you use custom background color, this should be *false* for beautiful UX/UI.',
      },
      source: {
        code: INPUT_FLOATING_LABEL_SAMPLE,
      },
    },
  },
  render: (args) => {
    const [text, setText] = React.useState('');
    return (
      <TextField
        {...args}
        value={text}
        onChangeText={setText}
      />
    );
  },
};

export const ControlledComponent: Story = {
  name: 'Controlled Component',
  args: {
    label: 'Phone Number',
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled component example with external state management. **Note:** For handling text logical, *Developer* must handle by yourself.',
      },
      source: {
        code: INPUT_CONTROLLED_SAMPLE,
      }
    },
  },
  render: (args) => {
    const [phone, setPhone] = React.useState('');

    const handlePhoneChange = (text: string) => {
      // Simple phone number formatting (remove non-digits)
      const cleaned = text.replace(/\D/g, '');
      setPhone(cleaned.slice(0, 10));
    };

    return (
      <TextField
        {...args}
        value={phone}
        onChangeText={handlePhoneChange}
        keyboardType="phone-pad"
        maxLength={10}
        renderStartIcon={(params) => {
          return (
            <Text color={params.focused ? colors.primary : colors.gray_D1D2D4}>+84</Text>
          )
        }}
      />
    );
  },
};

export const ComprehensiveExample: Story = {
  name: 'Comprehensive Example',
  parameters: {
    docs: {
      description: {
        story: 'A complete form example showcasing multiple TextField variations. **Note:** For handling text logical, *Developer* must handle by yourself.',
      },
      source: {
        code: INPUT_FORM_SAMPLE,
      }
    },
  },
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      password: '',
      bio: '',
    });

    const [errors, setErrors] = React.useState({
      name: false,
      email: false,
      password: false,
      bio: false,
    });

    const handleValidate = (field: string, value: string) => {
      let isValid = true;

      if (field === 'name') {
        isValid = value.length >= 2;
      } else if (field === 'email') {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      } else if (field === 'password') {
        isValid = value.length >= 8;
      } else if (field === 'bio') {
        isValid = value.length <= 200;
      }

      setErrors(prev => ({ ...prev, [field]: !isValid }));
    };

    const handleChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      handleValidate(field, value);
    };

    return (
      <View style={{ width: '100%', backgroundColor: colors.gray_FDFDFD, borderRadius: 10, padding: 20, borderWidth: 1, borderColor: colors.primary, margin: 20 }}>
        <Text color={colors.primary} style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
          User Registration Form
        </Text>

        <TextField
          label="Full Name"
          applyTopLabel={false}
          value={formData.name}
          onChangeText={(value) => handleChange('name', value)}
          error={errors.name ? 'Name must be at least 2 characters' : false}
          helperText="Your full name"
          helperTextColor={colors.gray_D1D2D4}
          containerStyle={{ marginBottom: 16 }}
        />

        <TextField
          label="Email Address"
          applyTopLabel={false}
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
          error={errors.email ? 'Please enter a valid email' : false}
          helperText="We will never share your email"
          helperTextColor={colors.gray_D1D2D4}
          keyboardType="email-address"
          containerStyle={{ marginBottom: 16 }}
        />

        <TextField
          label="Password"
          applyTopLabel={false}
          value={formData.password}
          onChangeText={(value) => handleChange('password', value)}
          error={errors.password ? 'Password must be at least 8 characters' : false}
          secureTextEntry
          containerStyle={{ marginBottom: 16 }}
        />

        <TextField
          label="Bio"
          applyTopLabel={false}
          value={formData.bio}
          onChangeText={(value) => handleChange('bio', value)}
          multiline
          rows={3}
          maxRows={5}
          helperText={`${formData.bio.length}/200 characters`}
          error={errors.bio ? 'Bio must be 200 characters or less' : false}
          errorColor={colors.red_E00102}
          containerStyle={{ marginBottom: 16 }}
          style={{
            fontSize: fontSize._16,
            color: errors.bio ? colors.red_E00102 : colors.black
          }}
        />

        <Button
          title={'Submit'}
          style={{
            backgroundColor: colors.primary,
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={fn(() => showAlert('Submit Press!', 'This is custom message'))}
        />
      </View>
    );
  },
};

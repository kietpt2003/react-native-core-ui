export const BASIC_INPUT_SAMPLE = `
import React from 'react';
import { TextField } from '@kietpt2003/react-native-core-ui';

const BasicInput = () => {
  const [text, setText] = React.useState('');

  return (
    <TextField
      value={text}
      onChangeText={t => {
        setText(t);
      }}
    />
  );
};

export default BasicInput;

`;

export const INPUT_WITH_HELPER_SAMPLE = `
import React from 'react';
import { TextField } from '@kietpt2003/react-native-core-ui';
import { colors } from '@kietpt2003/react-native-core-ui/themes';

const InputWithHelperText = () => {
  const [text, setText] = React.useState('');

  return (
    <TextField
      label="Email Address"
      helperText="We will never share your email"
      helperTextColor={colors.gray_D1D2D4}
      value={text}
      onChangeText={t => {
        setText(t);
      }}
    />
  );
};

export default InputWithHelperText;

`;

export const INPUT_WITH_ERROR_SAMPLE = `
import React from 'react';
import { TextField } from '@kietpt2003/react-native-core-ui';
import { colors } from '@kietpt2003/react-native-core-ui/themes';

const InputWithError = () => {
  const [text, setText] = React.useState('');

  return (
    <TextField
      label="Password"
      error={text?.length < 8 ? 'Password must be at least 8 characters' : false}
      errorColor={colors.error}
      value={text}
      onChangeText={t => {
        setText(t);
      }}
    />
  );
};

export default InputWithError;

`;

export const INPUT_WITH_ICON_SAMPLE = `
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgIcon, TextField } from '@kietpt2003/react-native-core-ui';
import { colors } from '@kietpt2003/react-native-core-ui/themes';

const InputWithIcon = () => {
  const [text, setText] = React.useState('');

  return (
    <TextField
      label="Search"
      value={text}
      onChangeText={setText}
      renderStartIcon={params => (
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
};

export default InputWithIcon;

`

export const WRONG_INPUT_MULTILINE_SAMPLE = `
import React from 'react';
import { TextField } from '@kietpt2003/react-native-core-ui';
import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes';

const WrongInputDemo = () => {
  const [text, setText] = React.useState('');

  const triggerFontLogical = () => {
    if (text?.length % 2 == 0) {
      return fontSize._14;
    }
    return fontSize._16;
  };

  return (
    <TextField
      label="Wrong sample"
      helperText="Please input"
      multiline
      rows={3}
      maxRows={5}
      containerStyle={{ width: 300 }}
      onChangeText={t => {
        setText(t);
      }}
      style={{
        textAlignVertical: 'top',
        fontSize: triggerFontLogical(), //Wrong!!
        color: colors.black, //Correct!
      }}
    />
  );
};

export default WrongInputDemo;

`

export const CORRECT_INPUT_MULTILINE_SAMPLE = `
import React from 'react';
import { TextField } from '@kietpt2003/react-native-core-ui';
import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes';

const CorrectInputDemo = () => {
  const [text, setText] = React.useState('');

  return (
    <TextField
      label="Wrong sample"
      helperText="Please input"
      multiline
      rows={3}
      maxRows={5}
      containerStyle={{ width: 300 }}
      onChangeText={t => {
        setText(t);
      }}
      style={{
        textAlignVertical: 'top',
        fontSize: fontSize._14, //Can provide hard code fontSize!
        color: colors.black, //Correct!
      }}
    />
  );
};

export default CorrectInputDemo;

`;

export const INPUT_MULTILINE_SAMPLE = `
import React from 'react';
import { TextField } from '@kietpt2003/react-native-core-ui';
import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes';

const InputWithIcon = () => {
  const [text, setText] = React.useState('');

  return (
    <TextField
      label="Comments"
      multiline
      rows={3}
      maxRows={5}
      containerStyle={{ width: 300 }}
      onChangeText={t => {
        setText(t);
      }}
      style={{
        textAlignVertical: 'center', //Only take effect on Mobile devices
        fontSize: fontSize._14,
        color: colors.black,
      }}
    />
  );
};

export default InputWithIcon;

`;

export const INPUT_DISABLE_SAMPLE = `
import React from 'react';
import { TextField } from '@kietpt2003/react-native-core-ui';

const InputDisable = () => {
  const [text, setText] = React.useState('');

  return (
    <TextField
      label="Comments"
      applyTopLabel={false}
      editable={false}
      value={text}
      defaultValue="Cannot edit this field"
      containerStyle={{ width: 300 }}
      onChangeText={t => {
        setText(t);
      }}
    />
  );
};

export default InputDisable;

`;

export const INPUT_CUSTOM_COLOR_SAMPLE = `
import React from 'react';
import { TextField } from '@kietpt2003/react-native-core-ui';
import { colors } from '@kietpt2003/react-native-core-ui/themes';

const InputCustomColor = () => {
  const [text, setText] = React.useState('');

  return (
    <TextField
      label="Username"
      value={text}
      containerStyle={{ width: 300 }}
      onChangeText={t => {
        setText(t);
      }}
      focusedColor={colors.green_42A046}
      errorColor={colors.error}
      helperTextColor={colors.black}
    />
  );
};

export default InputCustomColor;

`;

export const INPUT_LABEL_SIZE_SAMPLE = `
import React from 'react';
import { TextField } from '@kietpt2003/react-native-core-ui';
import { fontSize } from '@kietpt2003/react-native-core-ui/themes';

const InputLabelSize = () => {
  const [text, setText] = React.useState('');

  return (
    <TextField
      label="Email"
      labelSize={fontSize._14}
      labelMinSize={fontSize._12}
      value={text}
      containerStyle={{ width: 300 }}
      onChangeText={t => {
        setText(t);
      }}
    />
  );
};

export default InputLabelSize;

`;

export const INPUT_FLOATING_LABEL_SAMPLE = `
import React from 'react';
import { TextField } from '@kietpt2003/react-native-core-ui';

const InputFloatingLabel = () => {
  const [text, setText] = React.useState('');

  return (
    <TextField
      label="Static Label"
      applyTopLabel={false}
      value={text}
      containerStyle={{ width: 300 }}
      onChangeText={t => {
        setText(t);
      }}
    />
  );
};

export default InputFloatingLabel;

`

export const INPUT_CONTROLLED_SAMPLE = `
import React from 'react';
import { Text, TextField } from '@kietpt2003/react-native-core-ui';

const InputFloatingLabel = () => {
  const [phone, setPhone] = React.useState('');

  const handlePhoneChange = text => {
    // Simple phone number formatting (remove non-digits)
    const cleaned = text.replace(/\D/g, '');
    setPhone(cleaned.slice(0, 10));
  };

  return (
    <TextField
      label="Phone Number"
      value={phone}
      onChangeText={handlePhoneChange}
      keyboardType="phone-pad"
      maxLength={10}
      containerStyle={{ width: 300 }}
      renderStartIcon={params => {
        return (
          <Text color={params.focused ? colors.primary : colors.gray_D1D2D4}>
            +84
          </Text>
        );
      }}
    />
  );
};

export default InputFloatingLabel;

`;

export const INPUT_FORM_SAMPLE = `
import React from 'react';
import { Alert, View } from 'react-native';
import { Button, Text, TextField } from '@kietpt2003/react-native-core-ui';
import { colors, fontSize } from '@kietpt2003/react-native-core-ui/themes';

const InputFormSample = () => {
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

  const handleValidate = (field, value) => {
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

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    handleValidate(field, value);
  };

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: colors.gray_FDFDFD,
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.primary,
        margin: 20,
      }}>
      <Text
        color={colors.primary}
        style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
        User Registration Form
      </Text>

      <TextField
        label="Full Name"
        applyTopLabel={false}
        value={formData.name}
        onChangeText={value => handleChange('name', value)}
        error={errors.name ? 'Name must be at least 2 characters' : false}
        helperText="Your full name"
        helperTextColor={colors.gray_D1D2D4}
        containerStyle={{ marginBottom: 16 }}
      />

      <TextField
        label="Email Address"
        applyTopLabel={false}
        value={formData.email}
        onChangeText={value => handleChange('email', value)}
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
        onChangeText={value => handleChange('password', value)}
        error={
          errors.password ? 'Password must be at least 8 characters' : false
        }
        secureTextEntry
        containerStyle={{ marginBottom: 16 }}
      />

      <TextField
        label="Bio"
        applyTopLabel={false}
        value={formData.bio}
        onChangeText={value => handleChange('bio', value)}
        multiline
        rows={3}
        maxRows={5}
        helperText={\`\${formData.bio.length}/200 characters\`}
        error={errors.bio ? 'Bio must be 200 characters or less' : false}
        errorColor={colors.red_E00102}
        containerStyle={{ marginBottom: 16 }}
        style={{
          fontSize: fontSize._16,
          color: errors.bio ? colors.red_E00102 : colors.black,
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
        onPress={Alert('Submit Press!')}
      />
    </View>
  );
};

export default InputFormSample;

`
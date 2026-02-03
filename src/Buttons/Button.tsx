import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  TextProps,
  GestureResponderEvent,
} from 'react-native';

import { colors } from '@themes';
import { scale } from '@utils';
import Text from '../Texts/Text';

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  startIcon?: React.ReactNode;
  startIconStyle?: StyleProp<ViewStyle>;
  endIcon?: React.ReactNode;
  endIconStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  activeBgColor?: string;
  inactiveBgColor?: string;
  disabled?: boolean;
  isSubmit?: boolean;
  indicatorSize?: number | "small" | "large" | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  variant?: 'filled' | 'outline';
  borderColor?: string;
  titleProps?: TextProps;
}

const Button: React.FC<ButtonProps> = ({
  title,
  startIcon,
  startIconStyle,
  endIcon,
  endIconStyle,
  style,
  titleStyle,
  activeBgColor = colors.primary,
  inactiveBgColor = colors.gray_B3B3B3,
  disabled,
  isSubmit,
  indicatorSize,
  onPress,
  variant = 'filled',
  borderColor = colors.primary,
  titleProps,
  ...rest
}) => {
  const backgroundColor = disabled
    ? inactiveBgColor
    : variant === 'outline'
      ? colors.white
      : activeBgColor;

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled || isSubmit}
      onPress={onPress}
      style={[
        styles.btnContainer,
        variant === 'outline' && styles.btnContainerOutline,
        { backgroundColor },
        variant === 'outline' && { borderColor },
        style,
      ]}
    >
      {startIcon ? <View style={[styles.viewIconStart, startIconStyle]}>{startIcon}</View> : null}

      {isSubmit ? (
        <ActivityIndicator
          size={indicatorSize || 'small'}
          color={variant === 'outline' ? colors.primary : colors.white}
        />
      ) : (
        <Text
          style={[
            styles.textTitle,
            variant === 'outline' ? styles.textTitleOutline : {},
            titleStyle,
          ]}
          numberOfLines={1}
          {...titleProps}
        >
          {title}
        </Text>
      )}

      {endIcon ? <View style={[styles.viewIconEnd, endIconStyle]}>{endIcon}</View> : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    paddingHorizontal: scale(24),
    paddingVertical: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(5),
  },
  btnContainerOutline: {
    paddingHorizontal: scale(23),
    paddingVertical: scale(9),
    borderWidth: scale(1),
    backgroundColor: colors.white,
    borderColor: colors.primary,
  },
  viewIconStart: {
    marginRight: scale(16),
  },
  viewIconEnd: {
    marginLeft: scale(16),
  },
  textTitle: {
    color: colors.white,
    lineHeight: scale(20),
  },
  textTitleOutline: {
    color: colors.primary,
  },
});

Button.displayName = 'Button';

export default Button;

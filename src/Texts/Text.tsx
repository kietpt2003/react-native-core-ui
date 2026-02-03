import React from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  StyleProp,
} from 'react-native';
import { colors, fontSize } from '@themes';

export interface TextProps extends RNTextProps {
  style?: StyleProp<TextStyle>;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  light?: boolean;
  medium?: boolean;
  semiBold?: boolean;
  size?: number;
  thin?: boolean;
  children?: React.ReactNode;
}

/**
 * Text component for displaying text with custom styles and loading state.
 * This component also have its own view and can easily be customized.
 */
const Text: React.FC<TextProps> = ({
  bold = false,
  color = colors.black,
  italic = false,
  light = false,
  medium = false,
  semiBold = false,
  size = fontSize._16,
  style = {},
  thin = false,
  ...rest

}) => {
  let textStyle = {
    color,
    fontSize: size,
    fontStyle: italic ? 'italic' : 'normal',
    fontWeight: '400'
  };

  if (bold) {
    textStyle.fontWeight = '700';
  }

  if (semiBold) {
    textStyle.fontWeight = '600';
  }

  if (medium) {
    textStyle.fontWeight = '500';
  }

  if (light) {
    textStyle.fontWeight = '300';
  }

  if (thin) {
    textStyle.fontWeight = '100';
  }

  return <RNText {...rest} style={[styles.textDefault, textStyle, style]} />;
};

const styles = StyleSheet.create({
  textDefault: {
    color: colors.black,
  },
});

Text.displayName = 'Text';

export default Text;

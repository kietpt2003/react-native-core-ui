import React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { scale } from '@utils';
import { colors, fontSize } from '@themes';
import { ReactNode } from 'react';

interface TextProps extends RNTextProps {
  style?: TextStyle | TextStyle[];
  styleView?: ViewStyle | ViewStyle[];
  color?: string;
  bold?: boolean;
  load?: boolean;
  children?: ReactNode;
}

/**
 * Text component for displaying text with custom styles and loading state.
 * This component also have its own view and can easily be customized.
 */
const Text: React.FC<TextProps> = ({
  style,
  color,
  bold,
  children,
  load,
  styleView,
  ...rest
}) => {
  return (
    <View style={styleView}>
      {load ? (
        <View style={styles.load} />
      ) : (
        <RNText
          allowFontScaling={false}
          {...rest}
          style={[
            {
              color: color || colors.black,
              ...Platform.select({
                android: {
                  fontWeight: bold ? '700' : '400',
                  fontFamily: 'Arial',
                },
                ios: {
                  fontFamily: bold ? 'Arial Bold' : 'Arial',
                },
              }),
            },
            styles.text,
            style,
          ]}
        >
          {children}
        </RNText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSize._14,
  },
  load: {
    backgroundColor: colors.gray_E1E5EA,
    borderRadius: 8,
    paddingVertical: scale(10),
  },
});

export default Text;

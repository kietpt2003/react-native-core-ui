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
import { Colors, FontSize } from '@constant';
import { ReactNode } from 'react';

interface TextProps extends RNTextProps {
  style?: TextStyle | TextStyle[];
  styleView?: ViewStyle | ViewStyle[];
  color?: string;
  bold?: boolean;
  load?: boolean;
  children?: ReactNode;
}

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
              color: color || Colors.black,
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
    fontSize: FontSize.normal,
  },
  load: {
    backgroundColor: Colors.grayLoading,
    borderRadius: 8,
    paddingVertical: scale(10),
  },
});

export default Text;

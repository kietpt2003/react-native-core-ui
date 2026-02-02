import React from 'react';
import {
  View,
  ViewProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useTheme } from '@hooks/useTheme';
import { colorsUtils } from '@utils';

export type PaperVariant = 'elevation' | 'outlined';

export type PaperElevation =
  | 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;

export interface PaperProps extends ViewProps {
  elevation?: PaperElevation;
  square?: boolean;
  variant?: PaperVariant;
  style?: StyleProp<ViewStyle>;
}

const Paper = React.forwardRef<View, PaperProps>(function Paper(
  {
    elevation = 1,
    square = false,
    variant = 'elevation',
    style,
    ...rest
  },
  ref,
) {

  const { colors, isDark } = useTheme();
  
  const { shadowStyle, overlayColor } =
    variant === 'elevation'
      ? colorsUtils.getElevationStyle(elevation, isDark)
      : { shadowStyle: {} };

  const baseStyle: ViewStyle = {
    backgroundColor: colors.surface,
    borderRadius: square ? 0 : 8,
  };

  const outlinedStyle: ViewStyle =
    variant === 'outlined'
      ? {
        borderWidth: 1,
        borderColor: colors.outline,
      }
      : {};

  return (
    <View
      ref={ref}
      style={[
        baseStyle,
        shadowStyle,
        outlinedStyle,
        overlayColor ? { backgroundColor: overlayColor } : undefined,
        style,
      ]}
      {...rest}
    />
  );
});

Paper.displayName = 'Paper'

export default Paper;

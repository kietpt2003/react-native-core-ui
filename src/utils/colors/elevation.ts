import { ViewStyle } from 'react-native';

import { colors, elevationOverlay } from '@themes';
import { ANDROID } from '@utils';
import { alpha } from './color';

export function clampElevation(value: number) {
  return Math.min(24, Math.max(0, value));
}

export function getElevationStyle(
  elevation: number,
  isDark: boolean,
): {
  shadowStyle: ViewStyle;
  overlayColor?: string;
} {
  const e = clampElevation(elevation);

  if (e === 0) {
    return { shadowStyle: {} };
  }

  const shadowStyle: ViewStyle =
    ANDROID
      ? { elevation: e }
      : {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: e * 0.5 },
        shadowOpacity: 0.15,
        shadowRadius: e * 0.8,
      };

  if (!isDark) {
    return { shadowStyle };
  }

  const opacity = elevationOverlay[e] ?? 0.16;

  return {
    shadowStyle,
    overlayColor: alpha(colors.white, opacity),
  };
}

import { useColorScheme } from 'react-native';

import { colors } from '@themes';

export type ThemeMode = 'light' | 'dark';

export function useTheme() {
  const scheme = useColorScheme();
  const mode: ThemeMode = scheme === 'dark' ? 'dark' : 'light';

  const colorsMode = mode === 'dark' ? colors.darkColors : colors.lightColors;

  return {
    mode,
    colors: colorsMode,
    isDark: mode === 'dark',
  };
}

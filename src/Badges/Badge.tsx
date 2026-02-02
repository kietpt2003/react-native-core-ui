import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'

import { colors, fontSize } from '@themes';
import Text from '../Texts/Text';

export type BadgeAnchorOrigin = {
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'right';
};

export type BadgeVariant = 'standard' | 'dot';
export type BadgeOverlap = 'rectangular' | 'circular';

export interface BadgeProps {
  children: React.ReactNode;
  badgeContent?: number | string;
  max?: number;
  showZero?: boolean;
  invisible?: boolean;
  color?: string;
  variant?: BadgeVariant;
  overlap?: BadgeOverlap;
  anchorOrigin?: BadgeAnchorOrigin;
  contentStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  badgeStyle?: StyleProp<ViewStyle>;
}

function getDisplayValue(
  content: BadgeProps['badgeContent'],
  max: number,
) {
  if (typeof content === 'number') {
    return content > max ? `${max}+` : content;
  }
  return content;
}

function getBadgePosition(
  anchorOrigin: Required<BadgeAnchorOrigin>,
  overlap: BadgeOverlap,
) {
  const offset = overlap === 'circular' ? '14%' : 0;

  return {
    position: 'absolute' as const,
    top: anchorOrigin.vertical === 'top' ? offset : undefined,
    bottom: anchorOrigin.vertical === 'bottom' ? offset : undefined,
    left: anchorOrigin.horizontal === 'left' ? offset : undefined,
    right: anchorOrigin.horizontal === 'right' ? offset : undefined,
    transform: [
      { translateX: anchorOrigin.horizontal === 'right' ? 8 : -8 },
      { translateY: anchorOrigin.vertical === 'bottom' ? 8 : -8 },
    ],
  };
}

const RADIUS_STANDARD = 10;
const RADIUS_DOT = 8;

const Badge = React.forwardRef<View, BadgeProps>(function Badge(
  {
    children,
    badgeContent,
    max = 99,
    showZero = false,
    invisible = false,
    color = colors.primary,
    variant = 'standard',
    overlap = 'rectangular',
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    contentStyle,
    style,
    badgeStyle,
  },
  ref,
) {
  const isZero = badgeContent === 0;
  const isHidden =
    invisible ||
    badgeContent == null ||
    (!showZero && isZero && variant !== 'dot');

  const displayValue =
    variant === 'dot' ? undefined : getDisplayValue(badgeContent, max);

  return (
    <View ref={ref} style={[styles.root, style]}>
      {children}

      {!isHidden && (
        <View
          style={[
            styles.badge,
            variant === 'dot' && styles.dot,
            getBadgePosition(
              {
                vertical: anchorOrigin.vertical ?? 'top',
                horizontal: anchorOrigin.horizontal ?? 'right',
              },
              overlap,
            ),
            {
              backgroundColor: color
            },
            badgeStyle,
          ]}
        >
          {variant !== 'dot' && (
            <Text color={colors.white} style={[styles.defaultContentStyle, contentStyle]}>{displayValue}</Text>
          )}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  badge: {
    minWidth: RADIUS_STANDARD * 2,
    height: RADIUS_STANDARD * 2,
    borderRadius: RADIUS_STANDARD,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    zIndex: 1,
  },
  dot: {
    width: RADIUS_DOT * 2,
    height: RADIUS_DOT * 2,
    minWidth: RADIUS_DOT * 2,
    borderRadius: RADIUS_DOT,
    paddingHorizontal: 0,
  },
  defaultContentStyle: {
    fontSize: fontSize._12
  }
});

Badge.displayName = 'Badge';

export default Badge;
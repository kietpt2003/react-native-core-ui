import React from 'react';
import {
  Pressable,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  AccessibilityRole,
} from 'react-native';

export interface CardActionAreaProps {
  children?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  accessibilityRole?: AccessibilityRole;
}

const CardActionArea = React.forwardRef<View, CardActionAreaProps>(
  (
    {
      children,
      onPress,
      disabled = false,
      style,
      contentStyle,
      accessibilityRole = 'button',
    },
    ref,
  ) => {
    return (
      <Pressable
        ref={ref}
        disabled={disabled}
        onPress={onPress}
        accessibilityRole={accessibilityRole}
        style={({ pressed }) => [
          styles.root,
          style,
          pressed && styles.pressed,
          disabled && styles.disabled,
        ]}
      >
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>

        <View pointerEvents="none" style={styles.focusHighlight} />
      </Pressable>
    );
  },
);

CardActionArea.displayName = 'CardActionArea';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },

  content: {
    width: '100%',
  },

  pressed: {
    opacity: 0.92,
  },

  disabled: {
    opacity: 0.5,
  },

  focusHighlight: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
    opacity: 0,
  },
});

export default CardActionArea;

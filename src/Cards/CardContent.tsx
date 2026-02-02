import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface CardContentProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /**
   * Set to `true` if you want to have spacing at bottom longer (usually use for the last CardContent)
   */
  isLast?: boolean;
}

const CardContent: React.FC<CardContentProps> = ({
  children,
  style,
  isLast = true,
}) => {
  return (
    <View
      style={[
        styles.root,
        isLast && styles.last,
        style,
      ]}
    >
      {children}
    </View>
  );
};

CardContent.displayName = 'CardContent';

const styles = StyleSheet.create({
  root: {
    padding: 16,
  },
  last: {
    paddingBottom: 24,
  },
});

export default CardContent;

import {
  View,
  Platform,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@constant';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import { scale } from '@utils';

export default function Layout({
  hide,
  children,
  bottom,
  style,
  colors,
  barColor = 'transparent',
  barStyle = 'dark-content',
  translucent = true,
}) {
  const sai = useSafeAreaInsets();
  const headerStyle = Platform.select({
    android: {
      height: scale(20) + sai?.top,
    },
    default: styles.header,
  });

  const bottomStyle = Platform.select({
    android: {
      height: sai?.bottom,
      minHeight: sai?.top,
    },
  });

  return (
    <View style={[styles.wrapper, style]}>
      {hide ? (
        <View
          style={[
            styles.header,
            Platform.OS === 'android' && { height: sai?.top },
          ]}
        />
      ) : (
        <View
          style={[
            headerStyle,
            { backgroundColor: colors || Colors.background },
          ]}>
          <StatusBar hidden={true} />
        </View>
      )}
      {children}
      {bottom ? <View style={bottomStyle} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    height: StaticSafeAreaInsets.safeAreaInsetsTop,
  },
  bottom: {
    height: StaticSafeAreaInsets.safeAreaInsetsBottom,
  },
});

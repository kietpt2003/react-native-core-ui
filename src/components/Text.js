import React from 'react';
import { StyleSheet, Platform, View, Text as RNText } from 'react-native';
import { scale } from '@utils';
import { Colors, FontSize } from '@constants';

const Text = ({ style, color, bold, children, load, styleView, ...rest }) => {
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
                  fontFamily: bold ? 'Arial' : 'Arial',
                },
                ios: {
                  fontFamily: bold ? 'Arial Bold' : 'Arial',
                },
              }),
            },
            styles.text,
            style,
          ]}>
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

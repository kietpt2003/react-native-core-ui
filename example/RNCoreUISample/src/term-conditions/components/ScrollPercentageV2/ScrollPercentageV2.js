import { StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Colors } from '@constant';
import { scale } from '@utils';
import LoadingSquareRadius from './LoadingSquareRadius';

const ScrollPercentage = ({
  hide,
  percent = 0,
  borderRadius = 45,
  size = 120,
  backgroundColor = 'none',
  strokeEmptyColor = Colors.white,
  lowerColor = Colors.background,
  higherColor = Colors.background1,
  checkColor = Colors.white,
  marginBottom = scale(10),
  animateSpeed = 200,
  startPosition = 'top-left',
}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (hide) {
      Animated.timing(translateY, {
        toValue: size, // Di chuyển xuống
        duration: animateSpeed,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: -size, // Di chuyển lên
        duration: animateSpeed,
        useNativeDriver: true,
      }).start();
    }
  }, [hide]);

  return (
    <Animated.View
      style={[
        styles.box,
        {
          width: size,
          height: size,
          bottom: -size,
          transform: [{ translateY }],
          marginBottom,
        },
      ]}>
      <LoadingSquareRadius
        size={size}
        percent={percent}
        borderRadius={borderRadius}
        backgroundColor={backgroundColor}
        strokeEmptyColor={strokeEmptyColor}
        lowerColor={lowerColor}
        higherColor={higherColor}
        checkColor={checkColor}
        startPosition={startPosition}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default ScrollPercentage;

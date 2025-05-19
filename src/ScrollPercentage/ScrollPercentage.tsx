import { Animated, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '@themes';
import { ScrollPercentageProps } from './types/ScrollPercentageTypes';
import { LoadingCircle, LoadingSquareRadius } from './components';

/**
 * ScrollPercentage is a component that displays a loading indicator with a percentage value.
 * It can be customized with different shapes (circle or square), colors, and gradients.
 * 
 * To get more information. Please see the [Documentation](../README.md)
 */
const ScrollPercentage = ({
  hide,
  percent = 0,
  size = 60,
  borderRadius = 45,
  backgroundColor = 'none',
  strokeEmptyColor = colors.white,
  fill = colors.white,
  gradientDirection = 'horizontal',
  checkColor = colors.black,
  animateSpeed = 200,
  figure = 'circle',
  startPosition = 'top-left',
}: ScrollPercentageProps) => {
  const translateY = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
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

  const handleItem = () => {
    switch (figure) {
      case 'square':
        return (
          <LoadingSquareRadius
            size={size}
            percent={percent}
            backgroundColor={backgroundColor}
            strokeEmptyColor={strokeEmptyColor}
            fill={fill}
            gradientDirection={gradientDirection}
            checkColor={checkColor}
            startPosition={startPosition}
            borderRadius={borderRadius}
          />
        );
      case 'circle':
      default:
        return (
          <LoadingCircle
            size={size}
            percent={percent}
            backgroundColor={backgroundColor}
            strokeEmptyColor={strokeEmptyColor}
            fill={fill}
            gradientDirection={gradientDirection}
            checkColor={checkColor}
          />
        );
    }
  }

  return (
    <Animated.View
      style={[
        styles.box,
        {
          width: size,
          height: size,
          bottom: -size,
          transform: [{ translateY }],
        },
      ]}>
      {handleItem()}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default ScrollPercentage
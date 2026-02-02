import { View, StyleSheet } from 'react-native'
import React from 'react'
import Svg, { Circle, Defs, Path, Stop } from 'react-native-svg';

import { colors } from '@themes';
import { scale } from '@utils';
import { LinearGradient, LoadingCircleProps } from '../types/ScrollPercentageTypes';

const LoadingCircle = ({
  size = 60,
  percent = 0,
  backgroundColor = 'none',
  strokeEmptyColor = colors.white,
  fill = colors.white,
  gradientDirection = 'horizontal',
  checkColor = colors.white,
}: LoadingCircleProps) => {
  const STROKE_WIDTH = scale(size * 0.1);
  const RADIUS = (size - STROKE_WIDTH) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;
  const roundedPercent = Math.round(percent);

  const directionMap = {
    vertical: { x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
    horizontal: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
    diagonal: { x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
  };

  const defaultDirection = 'horizontal';
  const safeDirection = directionMap[gradientDirection] ?? directionMap[defaultDirection];
  const { x1, y1, x2, y2 } = safeDirection;

  const isGradient = Array.isArray(fill);
  const gradientId = 'grad';

  const stops = isGradient
    ? fill.map((color, index) => {
      const offset = (index / (fill.length - 1)) * 100;
      return (
        <Stop
          key={index}
          offset={`${offset}%`}
          stopColor={color}
          stopOpacity="1"
        />
      );
    })
    : undefined;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {
          isGradient &&
          <Defs>
            <LinearGradient id={gradientId} x1={x1} y1={y1} x2={x2} y2={y2}>
              {stops}
            </LinearGradient>
          </Defs>
        }
        <Circle
          stroke={strokeEmptyColor}
          fill={backgroundColor}
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
        />
        <Circle
          stroke={isGradient ? `url(#${gradientId})` : fill}
          fill={roundedPercent < 100 ? 'none' : isGradient ? `url(#${gradientId})` : fill}
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
        {roundedPercent === 100 && (
          <Path
            d={`M${size / 3} ${size / 1.9}l${size / 10} ${size / 10} ${size / 3.5
              }-${size / 3.5}`}
            stroke={checkColor}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingCircle;

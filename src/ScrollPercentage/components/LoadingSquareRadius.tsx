import { View, StyleSheet } from 'react-native'
import React from 'react'
import Svg, { Defs, Path, Rect, Stop } from 'react-native-svg'

import { LinearGradient, LoadingSquareRadiusProps } from '../types/ScrollPercentageTypes'
import { colors } from '@themes'
import { scale } from '@utils'

const LoadingSquareRadius = ({
  size = 120,
  percent = 0,
  borderRadius = 45,
  backgroundColor = 'none',
  strokeEmptyColor = colors.white,
  fill = colors.white,
  gradientDirection = 'horizontal',
  checkColor = colors.black,
  startPosition = 'top-left',
}: LoadingSquareRadiusProps) => {
  if (borderRadius > 45) { // Cannot higher than 45. Due to 45 * 4 = 180 Degree
    borderRadius = 45;
  }
  const STROKE_WIDTH = scale(size * 0.1);
  const roundedPercent = Math.round(percent);

  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * borderRadius;
  const SQUARE_WIDTH_AFTER_REMOVE_TWO_RADIUS = size - 2 * borderRadius;
  const SQUARE_CIRCUMFERENCE = 4 * SQUARE_WIDTH_AFTER_REMOVE_TWO_RADIUS + CIRCLE_CIRCUMFERENCE;

  let startOffset = 0;
  switch (startPosition) {
    case 'top-left':
      startOffset = (-90 / 360) * SQUARE_CIRCUMFERENCE;
      break;
    case 'top-right':
      startOffset = (-180 / 360) * SQUARE_CIRCUMFERENCE;
      break;
    case 'bottom-right':
      startOffset = (-270 / 360) * SQUARE_CIRCUMFERENCE;
      break;
    case 'bottom-left':
      startOffset = 0;
      break;
    default:
      startOffset = (-90 / 360) * SQUARE_CIRCUMFERENCE;
      break;
  }

  const visibleLength = (percent / 100) * SQUARE_CIRCUMFERENCE;
  const invisibleLength = SQUARE_CIRCUMFERENCE - visibleLength;

  const directionMap = {
    horizontal: { x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
    vertical: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
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
      <Svg width={size} height={size} viewBox={`0 0 ${size * 2} ${size * 2}`}>
        {
          isGradient &&
          <Defs>
            <LinearGradient id={gradientId} x1={x1} y1={y1} x2={x2} y2={y2}>
              {stops}
            </LinearGradient>
          </Defs>
        }
        <Rect
          x={size * 0.5}
          y={size * 0.5}
          width={size}
          height={size}
          rx={borderRadius}
          ry={borderRadius}
          strokeWidth={STROKE_WIDTH}
          stroke={strokeEmptyColor}
          fill={backgroundColor}
        />
        <Rect
          x={size * 0.5}
          y={size * 0.5}
          width={size}
          height={size}
          rx={borderRadius}
          ry={borderRadius}
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={`${visibleLength},${invisibleLength}`}
          strokeDashoffset={startOffset}
          strokeLinecap="round"
          stroke={isGradient ? `url(#${gradientId})` : fill}
          fill={roundedPercent < 100 ? 'none' : isGradient ? `url(#${gradientId})` : fill}
        />
        {roundedPercent === 100 && (
          <Path
            d={`M${size * 0.85} ${size / 0.95}l${size / 10} ${size / 10} ${size / 3.5
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

export default LoadingSquareRadius
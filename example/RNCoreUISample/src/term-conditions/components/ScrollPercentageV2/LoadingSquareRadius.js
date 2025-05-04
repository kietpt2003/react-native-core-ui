import { Colors } from '@constant';
import { scale } from '@utils';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

const LoadingSquareRadius = ({
  size = 120,
  percent = 0,
  borderRadius = 45,
  backgroundColor = 'none',
  strokeEmptyColor = Colors.white,
  lowerColor = Colors.background,
  higherColor = Colors.background1,
  checkColor = Colors.white,
  startPosition = 'top-left',
}) => {
  if (borderRadius > 45) { // Cannot higher than 45. Due to 45 * 4 = 180 Degree
    borderRadius = 45;
  }
  const STROKE_WIDTH = scale(size * 0.1);
  const roundedPercent = Math.round(percent);

  const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * borderRadius;
  const SQUARE_WIDTH_AFTER_REMOVE_TWO_RADIUS = size - 2 * borderRadius;
  const SQUARE_CIRCUMFERENCE = 4 * SQUARE_WIDTH_AFTER_REMOVE_TWO_RADIUS  + CIRCLE_CIRCUMFERENCE;

  let startOffset = 0;
  switch (startPosition) {
    case 'top-left':
      startOffset = ( -90 / 360) * SQUARE_CIRCUMFERENCE;
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

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size * 2} ${size * 2}`}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={higherColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={lowerColor} stopOpacity="1" />
          </LinearGradient>
        </Defs>
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
          stroke="url(#grad)"
          fill={roundedPercent < 100 ? 'none' : 'url(#grad)'}
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
  );
};

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

export default LoadingSquareRadius;

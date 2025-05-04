import { Colors } from '@constant';
import { scale } from '@utils';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

const LoadingCircle = ({
  size = 120,
  percent = 0,
  backgroundColor = 'none',
  strokeEmptyColor = Colors.white,
  lowerColor = Colors.background,
  higherColor = Colors.background1,
  checkColor = Colors.white,
}) => {
  const STROKE_WIDTH = scale(size * 0.1);
  const RADIUS = (size - STROKE_WIDTH) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeDashoffset = CIRCUMFERENCE - (CIRCUMFERENCE * percent) / 100;
  const roundedPercent = Math.round(percent);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={higherColor} stopOpacity="1" />
            <Stop offset="100%" stopColor={lowerColor} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Circle
          stroke={strokeEmptyColor}
          fill={backgroundColor}
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          strokeWidth={STROKE_WIDTH}
        />
        <Circle
          stroke="url(#grad)"
          fill={roundedPercent < 100 ? 'none' : 'url(#grad)'}
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

export default LoadingCircle;

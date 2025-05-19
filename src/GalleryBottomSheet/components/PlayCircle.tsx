import { ColorValue, StyleProp, ViewStyle } from 'react-native'
import Svg, { Circle, Polygon } from 'react-native-svg';
import React from 'react'
import { colors } from '@themes';
import { scale } from '@utils';

export interface CircleStyleProps {
  fill?: ColorValue;
  stroke?: ColorValue;
  strokeWidth?: number;
}

export interface PolygonStyleProps {
  fill?: ColorValue;
  stroke?: ColorValue;
  strokeWidth?: number;
}

export interface PlayCircleProps {
  size?: number;
  viewStyle?: StyleProp<ViewStyle>,
  circleStyle?: CircleStyleProps;
  polygonStyle?: PolygonStyleProps;
}

const defaultStrokeWidth = scale(5);
const maxStrokeWidth = scale(8);

const PlayCircle = ({
  size,
  viewStyle,
  circleStyle,
  polygonStyle,
}: PlayCircleProps) => {
  const circleStrokeWidth =
    typeof circleStyle?.strokeWidth === "number" && circleStyle.strokeWidth >= 0 && circleStyle.strokeWidth <= maxStrokeWidth
      ? circleStyle.strokeWidth
      : defaultStrokeWidth;

  const circleRadius = 50 - circleStrokeWidth / 2;

  const polygonStrokeWidth =
    typeof polygonStyle?.strokeWidth === "number" && polygonStyle.strokeWidth >= 0 && polygonStyle.strokeWidth <= maxStrokeWidth
      ? polygonStyle.strokeWidth
      : defaultStrokeWidth;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={viewStyle}
    >
      <Circle cx="50" cy="50" r={circleRadius}
        fill={circleStyle?.fill ? circleStyle.fill : colors.transparent50}
        stroke={circleStyle?.stroke ? circleStyle.stroke : colors.black}
        strokeWidth={circleStrokeWidth}
      />
      <Polygon points="40,30 40,70 70,50"
        fill={polygonStyle?.fill ? polygonStyle.fill : colors.gray_DDDDDD}
        stroke={polygonStyle?.stroke ? polygonStyle.stroke : colors.black}
        strokeWidth={polygonStrokeWidth}
      />
    </Svg>
  )
}

export default PlayCircle
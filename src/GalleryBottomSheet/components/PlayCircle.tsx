import { StyleProp, ViewStyle } from 'react-native'
import Svg, { Circle, Color, Polygon } from 'react-native-svg';
import React from 'react'
import { Colors } from '@constant';
import { scale } from '@utils';

export interface CircleStyleProps {
  fill?: Color;
  stroke?: Color;
  strokeWidth?: number;
}

export interface PolygonStyleProps {
  fill?: Color;
  stroke?: Color;
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
        fill={circleStyle?.fill ? circleStyle.fill : Colors.black_50}
        stroke={circleStyle?.stroke ? circleStyle.stroke : Colors.black}
        strokeWidth={circleStrokeWidth}
      />
      <Polygon points="40,30 40,70 70,50" 
        fill={polygonStyle?.fill ? polygonStyle.fill : Colors.graySystem}
        stroke={polygonStyle?.stroke ? polygonStyle.stroke : Colors.black}
        strokeWidth={polygonStrokeWidth}
      />
    </Svg>
  )
}

export default PlayCircle
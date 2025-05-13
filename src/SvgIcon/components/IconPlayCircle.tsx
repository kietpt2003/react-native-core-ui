import React from 'react'
import Svg, { Circle, Polygon } from 'react-native-svg'
import { SvgIconProps } from 'SvgIcon/types/SvgIconTypes'
import { scale } from '@utils';

const IconPlayCircle = ({
  size,
  color,
  strokeWidth,
  fill,
  style,
}: SvgIconProps) => {
  const circleStrokeWidth = scale(5);
  const circleRadius = 50 - circleStrokeWidth / 2;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={style}
    >
      <Circle cx="50" cy="50" r={circleRadius}
        fill={fill}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Polygon points="40,30 40,70 70,50"
        fill={color}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </Svg>
  )
}

export default IconPlayCircle
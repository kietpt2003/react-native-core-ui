import React from 'react'
import Svg, { Circle, Line } from 'react-native-svg'
import { SvgIconProps } from 'SvgIcon/types/SvgIconTypes'

const IconAlertCircle = ({
  size,
  color,
  strokeWidth,
  fill,
  style
}: SvgIconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
    >
      <Circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth={strokeWidth}
        fill={fill}
      />
      <Line
        x1="12"
        y1="7"
        x2="12"
        y2="12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <Circle cx="12" cy="17" r={strokeWidth} fill={color} />
    </Svg>
  )
}

export default IconAlertCircle
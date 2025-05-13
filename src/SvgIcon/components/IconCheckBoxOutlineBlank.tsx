import React from 'react'
import { SvgIconProps } from 'SvgIcon/types/SvgIconTypes'
import Svg, { Rect } from 'react-native-svg'

const IconCheckBoxOutlineBlank = ({
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
      <Rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke={color}
        strokeWidth={strokeWidth}
        fill={fill}
      />
    </Svg>
  )
}

export default IconCheckBoxOutlineBlank
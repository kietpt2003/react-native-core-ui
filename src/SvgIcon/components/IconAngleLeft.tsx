import React from 'react'
import Svg, { Polyline } from 'react-native-svg'
import { SvgIconProps } from 'SvgIcon/types/SvgIconTypes'

const IconAngleLeft = ({
  size,
  color,
  strokeWidth,
  style,
}: SvgIconProps) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={'none'}
      style={style}
    >
      <Polyline
        points={'15 18 9 12 15 6'}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconAngleLeft
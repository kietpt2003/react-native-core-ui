import React from 'react'
import { SvgIconProps } from 'SvgIcon/types/SvgIconTypes'
import Svg, { Polyline } from 'react-native-svg'

const IconAngleRight = ({
  size,
  color,
  strokeWidth,
  style
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
        points={'9 6 15 12 9 18'}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default IconAngleRight
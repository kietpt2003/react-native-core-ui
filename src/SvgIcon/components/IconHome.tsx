import React from 'react'
import Svg, { Path } from 'react-native-svg';

import { SvgIconProps } from 'SvgIcon/types/SvgIconTypes';

const IconHome = ({
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
      fill="none"
      style={style}
    >
      <Path
        d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H14V15H10V21H4C3.44772 21 3 20.5523 3 20V10.5Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default IconHome;

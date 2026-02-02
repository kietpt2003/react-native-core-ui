import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { SvgIconProps } from 'SvgIcon/types/SvgIconTypes';

const IconPerson = ({
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
      fill="none"
      style={style}
    >
      <Circle
        cx="12"
        cy="8"
        r="4"
        fill={strokeWidth ? 'none' : color}
        stroke={strokeWidth ? color : 'none'}
        strokeWidth={strokeWidth}
      />

      <Path
        d="M4 20c0-4 4-6 8-6s8 2 8 6v1H4v-1z"
        fill={strokeWidth ? 'none' : color}
        stroke={strokeWidth ? color : 'none'}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
};

export default IconPerson;

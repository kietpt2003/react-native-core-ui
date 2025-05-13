import React from 'react';
import { scale } from '@utils';
import { colors } from '@themes';
import { SvgIconProps } from './types/SvgIconTypes';
import { IconAlertCircle, IconAngleLeft, IconAngleRight, IconCheckBox, IconCheckBoxOutlineBlank, IconCheckBoxWithBg, IconPlayCircle, IconPlus } from './components';

/**
 * The SvgIcon component provide a variety of custom icon
 * that based on react-native-svg package. This not the best
 * choice, but it's can be perfect for specific cases.
 */
const SvgIcon = ({
  name = 'angle-left',
  size = scale(23),
  color = colors.black,
  strokeWidth = scale(1),
  fill = 'none',
  style,
}: SvgIconProps) => {
  switch (name) {
    case 'play-circle':
      return (
        <IconPlayCircle
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          fill={fill}
          style={style}
        />
      );
    case 'plus':
      return (
        <IconPlus
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          style={style}
        />
      );
    case 'check-box':
      return (
        <IconCheckBox
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          fill={fill}
          style={style}
        />
      );
    case 'check-box-with-bg':
      return (
        <IconCheckBoxWithBg
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          fill={fill}
          style={style}
        />
      );
    case 'check-box-outline-blank':
      return (
        <IconCheckBoxOutlineBlank
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          fill={fill}
          style={style}
        />
      );
    case 'alert-circle':
      return (
        <IconAlertCircle
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          fill={fill}
          style={style}
        />
      );
    case 'angle-right':
      return (
        <IconAngleRight
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          style={style}
        />
      );
    case 'angle-left':
    default:
      return (
        <IconAngleLeft
          size={size}
          color={color}
          strokeWidth={strokeWidth}
          style={style}
        />
      );
  }
};

export default SvgIcon;

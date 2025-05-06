import React from 'react';
import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';
import { scale } from '@utils';
import { Colors } from '@constant';

const SvgIcon = ({
  name = 'angle-left',
  size = scale(23),
  color = Colors.black,
  strokeWidth = scale(1),
  /**
   * Optional. Some icons have a fill color, like check-box. Other icons
   * are just outlines. This prop is used to set the fill color of the icon.
   */
  fill = 'none',
}) => {
  switch (name) {
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Line
            x1="12"
            y1="5"
            x2="12"
            y2="19"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          <Line
            x1="5"
            y1="12"
            x2="19"
            y2="12"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </Svg>
      );
    case 'check-box':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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

          <Path
            d="M7 12.5L10.5 16L17 8"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'check-box-with-bg':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke={color}
            strokeWidth={strokeWidth}
            fill={color}
          />

          <Path
            d="M7 12.5L10.5 16L17 8"
            stroke={fill}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'check-box-outline-blank':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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
      );
    case 'alert-circle':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
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
      );
    case 'angle-right':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={'none'}>
          <Polyline
            points={'9 6 15 12 9 18'}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case 'angle-left':
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill={'none'}>
          <Polyline
            points={'15 18 9 12 15 6'}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
  }
};

export default SvgIcon;

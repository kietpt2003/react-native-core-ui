import { StyleProp, ViewStyle } from "react-native";
import { Color } from "react-native-svg";

export interface SvgIconProps {
  /** Define the icon that you want to use.
   * 
   * *Default:* `name = 'angle-left'`
   * 
   * *Example:* `name = check-box`
   */
  name?: SvgIconName;
  /** Define the icon size.
   * 
   * *Default:* `size = scale(23)`
   * 
   * *Example:* `size = 23`
   */
  size?: number;
  /** Define the icon color, inherited react-native-svg color prop.
   * 
   * *Default:* `size = scale(23)`
   * 
   * *Example:* `size = 23`
   */
  color?: Color;
  /** Define the icon stroke width.
   * 
   * *Default:* `strokeWidth = scale(1)`
   * 
   * *Example:* `strokeWidth = 2`
   */
  strokeWidth?: number;
  /**
   * Optional. Some icons have a fill color, like check-box. Other icons
   * are just outlines. This prop is used to set the fill color of the icon.
   */
  fill?: Color,
  /** Define the style for the svg.
   * 
   * *Default:* `style = undefined`
   * 
   * *Example:* `style = { position: 'absolute', top: 10 }`
   */
  style?: StyleProp<ViewStyle>
}

export type SvgIconName =
  "plus" |
  "angle-left" |
  "check-box" |
  "check-box-with-bg" |
  "check-box-outline-blank" |
  "alert-circle" |
  "angle-right" |
  "play-circle" |
  "person" |
  "home" |
  "chevron-up" |
  "chevron-down"

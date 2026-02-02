import React from "react";
import { Color, LinearGradient as SvgLinearGradient, LinearGradientProps } from "react-native-svg";

export interface ScrollPercentageProps extends LoadingSquareRadiusProps {
  /**
   * Use to show/hide the loading figure. Default: hide = false
   * 
   * *Note:* For now, the loading figure only support animate from the bottom of the device.
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  hide: boolean;
  /**
   * The speed of the animation when showing/hiding the loading figure. Default: animateSpeed = 200
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  animateSpeed: number;
  /**
   * The shape of the loading figure. Default: figure = 'circle'
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  figure?: Figure;
}

export type GradientDirection = 'horizontal' | 'vertical' | 'diagonal';

export interface LoadingCircleProps {
  /**
   * The size of the loading figure. Default: size = 60
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  size: number;
  /**
   * The percentage of the loading figure. Default: percent = 0
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  percent: number;
  /**
   * The inline color of the loading figure before the loading start. Default: backgroundColor = 'none'
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  backgroundColor: Color;
  /**
   * The stroke color while the percent is 0. Default: strokeEmptyColor = '#FFFFFF'
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  strokeEmptyColor: Color;
  /**
   * The fill of the loading figure. Can be a single color or an array of colors. Default: fill = '#FFFFFF'
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  fill?: Color | Color[];
  /**
   * The gradient direction of the fill. Default: gradientDirection = 'horizontal'
   * 
   * *Note:*
   * - This property is only affected when the fill is an array of colors.
   * - The gradient direction can be `'horizontal'`, `'vertical'`, or `'diagonal'`.
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  gradientDirection?: GradientDirection;
  /**
   * The color of the check mark. Default: checkColor = '#000000'
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  checkColor: Color;
}

export type Figure = 'circle' | 'square';

export type StartPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface LoadingSquareRadiusProps extends LoadingCircleProps {
  /**
   * The border radius of the square figure. Default: borderRadius = 45
   * 
   * *Note:*
   * - This property is only affected when the `figure` = `'square'`.
   * - The border radius cannot higher than 45. Due to 45 * 4 = 180 Degree
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  borderRadius?: number;
  /**
   * The border radius of the square figure. Default: borderRadius = 45
   * 
   * *Note:*
   * - This property is only affected when the `figure` = `'square'`.
   * 
   * *Example:*
   * ```jsx
   *  import { ScrollPercentage } from '@estuary/rn-core-ui';
   *  const MyComponent = () => {
   *    const [scrollPercent, setScrollPercent] = React.useState(0);
   *    const [isOpen, setIsOpen] = React.useState(false);
   *    return (
   *      <ScrollPercentage
   *        hide={isOpen}
   *        size={60}
   *        percent={scrollPercent}
   *        backgroundColor="red"
   *        strokeEmptyColor="blue"
   *        fill="green" // Can be a single color or an array of colors
   *        gradientDirection="horizontal" // Choose the gradient direction of the fill
   *        checkColor="yellow" // Color of the check mark
   *        animateSpeed={200} // Animation speed in milliseconds when showing/hiding the loading figure
   *        figure="circle" // Choose between 'circle' or 'square'
   *        startPosition="top-left" // Only for square figure
   *        borderRadius={45} // Only for square figure
   *      />
   *    );
   *  }
   * ```
   * 
   * To get more information. Please see the [Documentation](../../README.md)
   */
  startPosition?: StartPosition;
}

type LinearGradientWithChildrenProps =
  React.PropsWithChildren<LinearGradientProps>;

export const LinearGradient = (
  props: LinearGradientWithChildrenProps
) => <SvgLinearGradient {...props} />;

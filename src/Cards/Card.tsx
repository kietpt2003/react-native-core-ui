import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';
import Paper, { PaperProps } from './Paper';

export interface CardProps extends ViewProps, PaperProps {
  /**
   * If true, the card will use raised styling.
   * @default false
   */
  raised?: boolean;

  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant?: PaperProps['variant'];

  /**
   * Custom style
   */
  style?: ViewStyle | ViewStyle[];
}

const Card = React.forwardRef<View, CardProps>(function Card(
  {
    raised = false,
    variant = 'elevation',
    style,
    ...rest
  },
  ref,
) {

  const resolvedElevation =
    raised && variant !== 'outlined' ? 8 : undefined;

  return (
    <Paper
      ref={ref}
      elevation={resolvedElevation}
      variant={variant}
      style={[
        {
          overflow: 'hidden',
        },
        style,
      ]}
      {...rest}
    />
  );
});

Card.displayName = 'Card';

export default Card;

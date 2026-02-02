import React from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

export interface CardActionsProps {
  children?: React.ReactNode;
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CardActions = React.forwardRef<View, CardActionsProps>(
  function CardActions(props, ref) {
    const {
      children,
      disableSpacing = false,
      style,
      ...other
    } = props;

    const childrenArray = React.Children.toArray(children);

    return (
      <View
        ref={ref}
        style={[
          styles.root,
          style,
        ]}
        {...other}
      >
        {childrenArray.map((child, index) => {
          if (!React.isValidElement(child)) return child;

          const spacingStyle =
            !disableSpacing && index > 0
              ? styles.spacing
              : null;

          return (
            <View key={index} style={spacingStyle}>
              {child}
            </View>
          );
        })}
      </View>
    );
  },
);

CardActions.displayName = 'CardActions';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  spacing: {
    marginLeft: 8,
  },
});

export default CardActions;

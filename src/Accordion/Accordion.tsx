import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { AccordionProps } from './types/AccordionTypes';

const Accordion: React.FC<AccordionProps> = ({
  header,
  children,
  expanded,
  defaultExpanded = false,
  onChange,
  style,
  disabled,
}) => {
  const isControlled = expanded !== undefined;
  const [internalExpanded, setInternalExpanded] =
    React.useState(defaultExpanded);

  const isExpanded = isControlled ? expanded : internalExpanded;

  const toggle = React.useCallback(() => {
    const next = !isExpanded;
    if (!isControlled) {
      setInternalExpanded(next);
    }
    onChange?.(next);
  }, [isExpanded, isControlled, onChange]);

  return (
    <View style={style}>
      <Pressable disabled={disabled} onPress={toggle}>
        {header}
      </Pressable>

      {isExpanded && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          layout={LinearTransition.springify()}
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
};

Accordion.displayName = 'Accordion';

export default Accordion;

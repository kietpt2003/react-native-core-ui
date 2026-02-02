import React from 'react';
import { View, ViewStyle } from 'react-native';

import { FlexProps } from './Flex.types';

const Flex = React.forwardRef<View, FlexProps>(
  (
    {
      align,
      children,
      flex = 0,
      gap = 0,
      justify = 'flex-start',
      style,
      vertical = false,
      wrap = false,
      ...rest
    },
    ref
  ) => {
    const containerStyle: ViewStyle = {
      alignItems: align,
      flex,
      flexDirection: vertical ? 'column' : 'row',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      gap,
      justifyContent: justify,
    };

    return (
      <View ref={ref} style={[containerStyle, style]} {...rest}>
        {children}
      </View>
    );
  }
);

Flex.displayName = 'Flex';

export default Flex;

import * as React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';

export interface SliderProps {
  value?: number;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onValueChange?: (value: number) => void;
  onSlidingStart?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
}

const Slider = React.forwardRef<View, SliderProps>(
  (
    {
      value = 0,
      minimumValue = 0,
      maximumValue = 100,
      step = 1,
      disabled = false,
      style,
      onValueChange,
      onSlidingStart,
      onSlidingComplete,
    },
    ref,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = Number(e.target.value);
      onValueChange?.(v);
    };

    return (
      <View ref={ref} style={style}>
        <input
          type="range"
          min={minimumValue}
          max={maximumValue}
          step={step}
          value={value}
          disabled={disabled}
          style={{ width: '100%' }}
          onMouseDown={() => onSlidingStart?.(value)}
          onChange={handleChange}
          onMouseUp={(e) =>
            onSlidingComplete?.(Number((e.target as HTMLInputElement).value))
          }
        />
      </View>
    );
  },
);

Slider.displayName = 'MockSlider';

export default Slider;

import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import Slider from '@react-native-community/slider';
import { colors } from '@estuary/rn-core-ui/themes';
import { Text } from '@estuary/rn-core-ui';

import { shadowStyles } from './styles/shadowStyles';

interface CustomSliderProps {
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  onValueChange?: ((value: number) => void) | undefined;
  value?: number | undefined;
  onSlidingComplete?: ((value: number) => void) | undefined;
  content?: string;
  inputValue?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined
}

const CustomSlider = ({
  minimumValue,
  maximumValue,
  step,
  onValueChange,
  value,
  onSlidingComplete,
  content,
  inputValue,
  onChangeText,
}: CustomSliderProps) => {
  return (
    <View>
      <View style={shadowStyles.sliderHeader}>
        <Text bold color={colors.black} style={shadowStyles.content}>{content || ''}</Text>
        <TextInput 
          value={inputValue} 
          onChangeText={onChangeText} 
          inputMode='numeric'
          style={shadowStyles.sliderTextInput}
        />
      </View>
      <Slider
        style={shadowStyles.slider}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        step={step}
        minimumTrackTintColor={colors.gray_BCBCBC}
        maximumTrackTintColor={colors.primary}
        onValueChange={onValueChange}
        value={value}
        onSlidingComplete={onSlidingComplete}
      />
    </View>
  )
}

const styles = StyleSheet.create({});

export default CustomSlider;

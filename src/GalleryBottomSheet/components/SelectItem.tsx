import { View, Text, StyleSheet, ColorValue } from 'react-native'
import React from 'react'
import { colors, fontSize } from '@themes';

export interface SelectItemStyleProps {
  backgroundColor?: ColorValue;
  iconColor?: ColorValue;
  textColor?: ColorValue;
}

export interface SelectItemProps {
  selectItemStyle?: SelectItemStyleProps;
  value?: number;
}

const SelectItem = ({
  selectItemStyle = { 
    backgroundColor: colors.white_80,
    iconColor: colors.blue_1890FF,
    textColor: colors.white,
  },
  value = 0,
}: SelectItemProps) => {
  return (
    <View 
      style={[styles.container, { backgroundColor: selectItemStyle.backgroundColor }]}
    >
      <View style={[styles.icon, { backgroundColor: selectItemStyle.iconColor }]}>
        <Text style={[styles.value, { color: selectItemStyle.textColor }]}>{value}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '30%',
    height: '30%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: fontSize._14,
    fontWeight: 'bold',
  }
});

export default SelectItem
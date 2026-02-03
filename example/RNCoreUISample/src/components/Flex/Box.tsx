import React from "react";
import { View, Text } from "react-native";
import { colors } from "@kietpt2003/react-native-core-ui/themes";

type BoxProps = {
  label: string;
  height?: number;
  width?: number;
}

const Box = ({ label, height = 60, width = 60 }: BoxProps) => (
  <View
    style={{
      width,
      height,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    }}
  >
    <Text style={{ color: colors.white, fontSize: 12 }}>{label}</Text>
  </View>
);

export default Box;

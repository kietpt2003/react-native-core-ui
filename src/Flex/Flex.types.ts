import { FlexStyle, ViewProps } from "react-native";

export type FlexProps = ViewProps & {
  align?: FlexStyle['alignItems'];
  flex?: FlexStyle['flex'];
  gap?: number;
  justify?: FlexStyle['justifyContent'];
  vertical?: boolean;
  wrap?: boolean;
};

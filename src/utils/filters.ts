import { TextStyle } from "react-native";

const ALLOWED_STYLE_KEYS = ['color', 'fontFamily', 'fontWeight'] as const;

export const filterAllowedTextStyle = (style: any): Partial<TextStyle> => {
  const filtered: Partial<TextStyle> = {};
  for (const key of ALLOWED_STYLE_KEYS) {
    if (key in style) {
      filtered[key] = style[key];
    }
  }
  return filtered;
};
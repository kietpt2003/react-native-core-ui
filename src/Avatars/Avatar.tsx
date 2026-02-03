import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import FastImage, { Source, ImageStyle } from 'react-native-fast-image';

import { colors } from '@themes';
import SvgIcon from '../SvgIcon/SvgIcon';

export type AvatarVariant = 'circular' | 'rounded' | 'square';

export interface AvatarProps {
  source?: number | Source | undefined;
  size?: number;
  variant?: AvatarVariant;
  children?: React.ReactNode;
  alt?: string;
  style?: StyleProp<ViewStyle>;
  imageStyle?: ImageStyle;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
  iconColor?: string;
  isFirstAlt?: boolean;
}

const getAltLetter = (alt?: string, isFirstAlt = true) => {
  if (!alt) return undefined;

  const parts = alt
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (!parts.length) return undefined;

  const word = isFirstAlt ? parts[0] : parts[parts.length - 1];
  return word.charAt(0).toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 40,
  variant = 'circular',
  children,
  alt,
  style,
  imageStyle,
  textStyle,
  backgroundColor = colors.primary,
  iconColor = colors.white,
  isFirstAlt = true,
}) => {
  const [error, setError] = React.useState(false);

  const altLetter = getAltLetter(alt, isFirstAlt);

  const borderRadius =
    variant === 'square'
      ? 0
      : variant === 'rounded'
        ? 8
        : size / 2;

  const showImage = source && !error;

  return (
    <View
      style={[
        styles.root,
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor: showImage ? undefined : backgroundColor,
        },
        style,
      ]}
    >
      {showImage ? (
        <FastImage
          source={source}
          style={[
            StyleSheet.absoluteFill,
            { borderRadius },
            imageStyle,
          ]}
          resizeMode="cover"
          onError={() => setError(true)}
        />
      ) : children ? (
        children
      ) : altLetter ? (
        <Text style={[styles.text, textStyle]}>
          {altLetter}
        </Text>
      ) : (
        <SvgIcon name='person' color={iconColor} size={size / 2} />
      )}
    </View>
  );
};

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },

  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  fallbackText: {
    fontSize: 20,
  },
});

Avatar.displayName = 'Avatar';

export default Avatar;

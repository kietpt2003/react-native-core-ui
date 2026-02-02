import React from 'react';
import {
  ImageBackground,
  ImageResizeMode,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import FastImage, {
  ImageStyle,
  ResizeMode as FastImageResizeMode,
  Source,
} from 'react-native-fast-image';

export type CardMediaComponent = 'image' | 'background';

interface BaseProps {
  children?: React.ReactNode;
}

export interface CardMediaImageProps extends BaseProps {
  component?: 'image';
  source: number | Source | undefined;
  resizeMode?: FastImageResizeMode;
  style?: StyleProp<ImageStyle>;
}

export interface CardMediaBackgroundProps extends BaseProps {
  component: 'background';
  source: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  style?: StyleProp<ViewStyle>;
}

export type CardMediaProps =
  | CardMediaImageProps
  | CardMediaBackgroundProps;

const CardMedia: React.FC<CardMediaProps> = (props) => {
  const { children } = props;

  if (props.component === 'background') {
    const { source, resizeMode = 'cover', style } = props;

    return (
      <ImageBackground
        source={source}
        resizeMode={resizeMode}
        style={[{ width: '100%' }, style]}
      >
        {children}
      </ImageBackground>
    );
  }

  const { source, resizeMode = 'cover', style } = props;

  if (!source) return null;

  return (
    <FastImage
      source={source}
      resizeMode={resizeMode}
      style={[{ width: '100%' }, style]}
    />
  );
};

CardMedia.displayName = 'CardMedia';

export default CardMedia;

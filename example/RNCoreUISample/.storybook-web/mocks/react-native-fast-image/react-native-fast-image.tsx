import React from 'react';
import { Image, ImageProps } from 'react-native';

type FastImageType = React.FC<ImageProps> & {
  resizeMode: {
    contain: 'contain';
    cover: 'cover';
    stretch: 'stretch';
    center: 'center';
  };
  priority: {
    low: 'low';
    normal: 'normal';
    high: 'high';
  };
  cacheControl: {
    immutable: 'immutable';
    web: 'web';
    cacheOnly: 'cacheOnly';
  };
};

const FastImage = ((props: ImageProps) => {
  return <Image {...props} />;
}) as FastImageType;

FastImage.resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center',
};

FastImage.priority = {
  low: 'low',
  normal: 'normal',
  high: 'high',
};

FastImage.cacheControl = {
  immutable: 'immutable',
  web: 'web',
  cacheOnly: 'cacheOnly',
};

export default FastImage;

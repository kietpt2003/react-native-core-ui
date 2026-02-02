import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import { colors } from '@themes';

export interface CardHeaderProps {
  avatar?: React.ReactNode;
  action?: React.ReactNode;

  title?: React.ReactNode;
  subheader?: React.ReactNode;

  disableTypography?: boolean;

  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;

  titleStyle?: StyleProp<TextStyle>;
  subheaderStyle?: StyleProp<TextStyle>;
}

const CardHeader = React.forwardRef<View, CardHeaderProps>(
  (
    {
      avatar,
      action,
      title,
      subheader,
      disableTypography = false,
      style,
      contentStyle,
      titleStyle,
      subheaderStyle,
    },
    ref,
  ) => {
    const renderTitle = () => {
      if (title == null) return null;
      if (disableTypography || React.isValidElement(title)) return title;

      return (
        <Text
          numberOfLines={1}
          style={[styles.title, !!avatar && styles.titleWithAvatar, titleStyle]}
        >
          {title}
        </Text>
      );
    };

    const renderSubheader = () => {
      if (subheader == null) return null;
      if (disableTypography || React.isValidElement(subheader)) return subheader;

      return (
        <Text
          numberOfLines={2}
          style={[
            styles.subheader,
            !!avatar && styles.subheaderWithAvatar,
            subheaderStyle,
          ]}
        >
          {subheader}
        </Text>
      );
    };

    return (
      <View ref={ref} style={[styles.root, style]}>
        {avatar && <View style={styles.avatar}>{avatar}</View>}

        <View style={[styles.content, contentStyle]}>
          {renderTitle()}
          {renderSubheader()}
        </View>

        {action && <View style={styles.action}>{action}</View>}
      </View>
    );
  },
);

CardHeader.displayName = 'CardHeader';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },

  avatar: {
    marginRight: 16,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
  },

  action: {
    marginLeft: 8,
    alignSelf: 'flex-start',
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
  },

  titleWithAvatar: {
    fontSize: 14,
  },

  subheader: {
    marginTop: 2,
    fontSize: 14,
    color: colors.gray_727272,
  },

  subheaderWithAvatar: {
    fontSize: 13,
  },
});

export default CardHeader;

import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
} from 'react-native';

import colors from '@themes/colors';
import fontSize from '@themes/fontSize';
import Text from '../Texts/Text';

export interface BreadcrumbItem {
  item?: string | React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string | React.ReactNode;
}

const DEFAULT_SEPARATOR = '›';

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = DEFAULT_SEPARATOR,
}) => {
  const renderItem = (i: BreadcrumbItem, isLast: boolean) => {
    if (typeof i.item === 'string') {
      return (
        <Text style={[
          styles.itemText,
          isLast && styles.lastItem,
          i.onPress && styles.link,
        ]}>{i.item}</Text>
      )
    }

    return i.item;
  };

  const renderSeparator = () => {
    if (typeof separator === 'string') {
      return <Text style={styles.separator}>{separator}</Text>;
    }

    return separator;
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        const content = renderItem(item, isLast);

        return (
          <View key={index} style={styles.itemWrapper}>
            {<Pressable
              disabled={(item?.disabled !== undefined) ? item?.disabled : isLast}
              onPress={item?.onPress}
              style={({ pressed }) => [
                pressed && styles.pressed,
              ]}
            >
              {content}
            </Pressable>}

            {!isLast && renderSeparator()}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  itemText: {
    fontSize: fontSize._14,
    color: colors.black,
  },
  link: {
    fontWeight: '500',
  },
  lastItem: {
    color: colors.primary,
    fontWeight: '500',
  },
  separator: {
    marginHorizontal: 8,
    color: colors.gray,
    fontSize: fontSize._14,
  },
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;

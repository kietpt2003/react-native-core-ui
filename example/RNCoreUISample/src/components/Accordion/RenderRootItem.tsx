import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SvgIcon, Text } from '@estuary/rn-core-ui';
import { AccordionTreeItemProps } from '@estuary/rn-core-ui/Accordion/types/AccordionTypes';
import { colors } from '@estuary/rn-core-ui/themes';


const RenderRootItem = ({ item, isExpanded, level }: AccordionTreeItemProps) => {
  const hasChildren = !!item.children?.length;

  return (
    <View style={[styles.row, { paddingLeft: 16 + level * 12 }]}>
      {hasChildren && (
        <SvgIcon
          name={isExpanded ? "chevron-down" : "angle-right"}
          size={16}
          style={styles.icon}
          color={colors.white}
        />
      )}

      <Text color={colors.white} style={styles.text}>{item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.black
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
});

export default RenderRootItem;

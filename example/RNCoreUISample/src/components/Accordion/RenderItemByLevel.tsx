import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AccordionTreeItemProps } from '@estuary/rn-core-ui/Accordion/types/AccordionTypes'
import { SvgIcon, Text } from '@estuary/rn-core-ui';
import { colors } from '@estuary/rn-core-ui/themes';

const RenderItemByLevel = ({ item, isExpanded, level }: AccordionTreeItemProps) => {
  const hasChildren = !!item.children?.length;

  const renderRow = (background: string, color: string) => {
    return (
      <View style={[styles.row, item.disabled ? undefined : { backgroundColor: background }]}>
        {hasChildren && (
          <SvgIcon
            name={isExpanded ? "chevron-down" : "angle-right"}
            size={16}
            style={styles.icon}
            color={color}
          />
        )}

        <Text color={item.disabled ? colors.black : color} style={styles.text}>{item.title}</Text>
      </View>
    );
  }

  if (level == 0) {
    return renderRow(colors.black, colors.white)
  }

  if (level == 1) {
    return renderRow(colors.primary, colors.white)
  }

  if (level == 2) {
    return renderRow(colors.purple_9370DB, colors.white)
  }

  return (
    <View style={[styles.row]}>
      {hasChildren && (
        <SvgIcon
          name={isExpanded ? "chevron-down" : "angle-right"}
          size={16}
          style={styles.icon}
        />
      )}

      <Text style={styles.text}>{item.title}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    flex: 1,
  },
});

export default RenderItemByLevel;

import React from 'react';
import { View } from 'react-native';

import AccordionItem from './AccordionItem';
import Text from '../Texts/Text';
import {
  AccordionNode,
  AccordionTreeItemProps,
  AccordionTreeProps,
  AccordionTreeInternalProps,
  AccordionId,
} from './types/AccordionTypes';
import AccordionGroup, { useOptionalAccordionGroup } from './AccordionGroup';

const makeTreeId = (path: string): AccordionId =>
  `accordion-node-${path}`;

const AccordionTreeInternal: React.FC<
  AccordionTreeInternalProps &
  Pick<
    AccordionTreeProps,
    | 'type'
    | 'style'
    | 'itemStyle'
    | 'itemTextStyle'
    | 'renderItem'
    | 'renderRootItem'
    | 'onItemChange'
  >
> = ({
  data,
  path,
  level,
  type,
  style,
  itemStyle,
  itemTextStyle,
  renderItem,
  renderRootItem,
  onItemChange,
}) => {
  const group = useOptionalAccordionGroup();

  const renderContent = (item: AccordionNode, nodeId: AccordionId, isExpanded: boolean, level: number) => {
    const props: AccordionTreeItemProps = { item, nodeId, isExpanded, level };

    if (item?.label) {
      return item?.label;
    }

    if (renderRootItem) {
      return renderRootItem(props);
    }

    if (renderItem) {
      return renderItem(props);
    }

    return (
      <View style={itemStyle}>
        <Text style={itemTextStyle}>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={style}>
      {data.map((item, index) => {
        const currentPath = `${path}-${index}`;

        const nodeId = item?.id ?? makeTreeId(currentPath);

        const isExpanded = group?.openIds.has(nodeId) ?? false;

        return (
          <AccordionItem
            key={nodeId}
            id={nodeId}
            header={renderContent(item, nodeId, isExpanded, level)}
            disabled={item.disabled}
            onChange={(expanded) => {
              onItemChange?.(item, {
                id: nodeId,
                path: currentPath,
                expanded,
              });
            }}
          >
            {item.children?.length ? (
              <AccordionGroup type={type}>
                <AccordionTreeInternal
                  data={item.children}
                  path={currentPath}
                  level={level + 1}
                  type={type}
                  itemStyle={itemStyle}
                  itemTextStyle={itemTextStyle}
                  renderItem={renderItem}
                  onItemChange={onItemChange}
                />
              </AccordionGroup>
            ) : null}
          </AccordionItem>
        );
      })}
    </View>
  );
};

export default AccordionTreeInternal;

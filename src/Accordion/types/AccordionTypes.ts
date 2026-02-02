import React from 'react';
import { TextStyle, ViewStyle } from "react-native";

export type AccordionId = string | number;

export type AccordionGroupType = 'single' | 'multiple';

export interface AccordionProps {
  header: React.ReactNode;
  children: React.ReactNode;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onChange?: (expanded: boolean) => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export interface AccordionNode {
  id?: AccordionId;
  title?: string;
  label?: React.ReactNode;
  disabled?: boolean;
  children?: AccordionNode[];
}

export interface AccordionTreeProps extends AccordionTreeRenderProps {
  type?: AccordionGroupType;
  data: AccordionNode[];
  style?: ViewStyle;
  itemStyle?: ViewStyle;
  itemTextStyle?: TextStyle;
  onItemChange?: (
    item: AccordionNode,
    info: {
      id: AccordionId;
      path: string;
      expanded: boolean;
    }
  ) => void;
}

export interface AccordionGroupContextValue {
  openIds: Set<AccordionId>;
  toggle: (id: AccordionId) => void;
}

export interface AccordionGroupProps {
  children: React.ReactNode;
  type?: AccordionGroupType;
  defaultOpenIds?: AccordionId[];
}

export interface AccordionItemProps {
  id: AccordionId;
  header: React.ReactNode;
  children: React.ReactNode;
  onChange?: (expanded: boolean) => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export interface AccordionTreeItemProps {
  item: AccordionNode;
  nodeId: AccordionId;
  isExpanded: boolean;
  level: number;
}

export interface AccordionTreeInternalProps {
  data: AccordionNode[];
  path: string;
  level: number;
}

export interface AccordionTreeRenderProps {
  renderItem?: (params: AccordionTreeItemProps) => React.ReactNode;
  renderRootItem?: (params: AccordionTreeItemProps) => React.ReactNode;
}

import React from "react";
import {
  DraggableFlatListProps,
  RenderItemParams,
} from "@constant/DraggableFlatList/types";

export interface WebDraggableFlatListProps<T> extends Omit<
  DraggableFlatListProps<T>,
  "renderItem" | "containerStyle"
> {
  renderItem: (params: RenderItemParams<T>) => React.ReactNode;
  containerStyle?: React.CSSProperties;
}

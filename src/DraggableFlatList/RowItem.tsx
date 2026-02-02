import React from "react";

import { typedMemo } from "@utils/DraggableFlatList/typedMemo";
import { RenderItem } from "@constant/DraggableFlatList/types";
import { useStableCallback } from "@hooks/DraggableFlatList/useStableCallback";
import { useRefs } from "@context/DraggableFlatList/refContext";
import { useDraggableFlatListContext } from "@context/DraggableFlatList/draggableFlatListContext";

type Props<T> = {
  extraData?: any;
  drag: (itemKey: string) => void;
  item: T;
  renderItem: RenderItem<T>;
  itemKey: string;
  debug?: boolean;
};

function RowItem<T>(props: Props<T>) {
  const propsRef = React.useRef(props);
  propsRef.current = props;

  const { activeKey } = useDraggableFlatListContext();
  const activeKeyRef = React.useRef(activeKey);
  activeKeyRef.current = activeKey;
  const { keyToIndexRef } = useRefs();

  const drag = useStableCallback(() => {
    const { drag, itemKey, debug } = propsRef.current;
    if (activeKeyRef.current) {
      // already dragging an item, noop
      if (debug)
        console.log(
          "## attempt to drag item while another item is already active, noop",
        );
    }
    drag(itemKey);
  });

  const { renderItem, item, itemKey, extraData } = props;

  const getIndex = useStableCallback(() => {
    return keyToIndexRef.current.get(itemKey);
  });

  return (
    <MemoizedInner
      isActive={activeKey === itemKey}
      drag={drag}
      renderItem={renderItem}
      item={item}
      getIndex={getIndex}
      extraData={extraData}
    />
  );
}

type InnerProps<T> = {
  isActive: boolean;
  item: T;
  getIndex: () => number | undefined;
  drag: () => void;
  renderItem: RenderItem<T>;
  extraData?: any;
};

function Inner<T>({ renderItem, extraData, ...rest }: InnerProps<T>) {
  return renderItem({ ...rest }) as JSX.Element;
}

const MemoizedInner = typedMemo(Inner);

export default typedMemo(RowItem);

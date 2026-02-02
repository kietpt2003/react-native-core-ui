import React from "react";
import { findNodeHandle, LogBox } from "react-native";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { FlatList } from "react-native-gesture-handler";

import { useStableCallback } from "@hooks/DraggableFlatList/useStableCallback";
import { useNestedAutoScroll } from "@hooks/DraggableFlatList/useNestedAutoScroll";
import { useSafeNestableScrollContainerContext } from "@context/DraggableFlatList/nestableScrollContainerContext";
import { DraggableFlatListProps } from "@constant/DraggableFlatList/types";
import DraggableFlatList from "./DraggableFlatList";

function NestableDraggableFlatListInner<T>(
  props: DraggableFlatListProps<T>,
  ref?: React.ForwardedRef<FlatList<T>>,
) {
  const hasSuppressedWarnings = React.useRef(false);

  if (!hasSuppressedWarnings.current) {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing",
    ]); // Ignore log notification by message
    //@ts-ignore
    console.reportErrorsAsExceptions = false;
    hasSuppressedWarnings.current = true;
  }

  const { scrollableRef, outerScrollOffset, setOuterScrollEnabled } =
    useSafeNestableScrollContainerContext();

  const listVerticalOffset = useSharedValue(0);
  const [animVals, setAnimVals] = React.useState({});
  const defaultHoverOffset = useSharedValue(0);
  const [listHoverOffset, setListHoverOffset] =
    React.useState(defaultHoverOffset);

  const hoverOffset = useDerivedValue(() => {
    return listHoverOffset.value + listVerticalOffset.value;
  }, [listHoverOffset]);

  useNestedAutoScroll({
    ...animVals,
    hoverOffset,
  });

  const onListContainerLayout = useStableCallback(async ({ containerRef }) => {
    const nodeHandle = findNodeHandle(scrollableRef.current);

    const onSuccess = (_x: number, y: number) => {
      listVerticalOffset.value = y;
    };
    const onFail = () => {
      console.log("## nested draggable list measure fail");
    };

    //@ts-ignore
    containerRef.current.measureLayout(nodeHandle, onSuccess, onFail);
  });

  const onDragBegin: DraggableFlatListProps<T>["onDragBegin"] =
    useStableCallback((params) => {
      setOuterScrollEnabled(false);
      props.onDragBegin?.(params);
    });

  const onDragEnd: DraggableFlatListProps<T>["onDragEnd"] = useStableCallback(
    (params) => {
      setOuterScrollEnabled(true);
      props.onDragEnd?.(params);
    },
  );

  const onAnimValInit: DraggableFlatListProps<T>["onAnimValInit"] =
    useStableCallback((params) => {
      setListHoverOffset(params.hoverOffset);
      setAnimVals({
        ...params,
        hoverOffset,
      });
      props.onAnimValInit?.(params);
    });

  return (
    <DraggableFlatList
      ref={ref}
      onContainerLayout={onListContainerLayout}
      activationDistance={props.activationDistance || 20}
      scrollEnabled={false}
      {...props}
      outerScrollOffset={outerScrollOffset}
      onDragBegin={onDragBegin}
      onDragEnd={onDragEnd}
      onAnimValInit={onAnimValInit}
    />
  );
}

export const NestableDraggableFlatList = React.forwardRef(
  NestableDraggableFlatListInner,
) as <T>(
  props: DraggableFlatListProps<T> & { ref?: React.ForwardedRef<FlatList<T>> },
) => ReturnType<typeof NestableDraggableFlatListInner>;

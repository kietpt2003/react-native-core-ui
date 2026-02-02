import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
} from "react-native-reanimated";

import { typedMemo } from "@utils/DraggableFlatList/typedMemo";
import { RenderPlaceholder } from "@constant/DraggableFlatList/types";
import { useRefs } from "@context/DraggableFlatList/refContext";
import { useDraggableFlatListContext } from "@context/DraggableFlatList/draggableFlatListContext";
import { useAnimatedValues } from "@context/DraggableFlatList/animatedValueContext";

type Props<T> = {
  renderPlaceholder?: RenderPlaceholder<T>;
};

function PlaceholderItem<T>({ renderPlaceholder }: Props<T>) {
  const [size, setSize] = React.useState(0);
  const {
    activeCellSize,
    placeholderOffset,
    spacerIndexAnim,
    horizontalAnim,
    scrollOffset,
  } = useAnimatedValues();
  const { keyToIndexRef, propsRef } = useRefs<T>();
  const { activeKey, horizontal } = useDraggableFlatListContext();

  // Size does not seem to be respected when it is an animated style
  useAnimatedReaction(
    () => {
      return activeCellSize.value;
    },
    (cur, prev) => {
      if (cur !== prev) {
        runOnJS(setSize)(cur);
      }
    },
  );

  const activeIndex = activeKey
    ? keyToIndexRef.current.get(activeKey)
    : undefined;
  const activeItem =
    activeIndex === undefined ? null : propsRef.current?.data[activeIndex];

  const animStyle = useAnimatedStyle(() => {
    const offset = placeholderOffset.value - scrollOffset.value;
    return {
      opacity: size >= 0 ? 1 : 0,
      overflow: "hidden",
      transform: [
        horizontalAnim.value ? { translateX: offset } : { translateY: offset },
      ],
    };
  }, [spacerIndexAnim, placeholderOffset, horizontalAnim, scrollOffset, size]);

  const extraStyle = React.useMemo(() => {
    return horizontal ? { width: size } : { height: size };
  }, [horizontal, size]);

  return (
    <Animated.View
      pointerEvents={activeKey ? "auto" : "none"}
      style={[StyleSheet.absoluteFill, animStyle, extraStyle]}
    >
      {!activeItem || activeIndex === undefined
        ? null
        : renderPlaceholder?.({ item: activeItem, index: activeIndex })}
    </Animated.View>
  );
}

export default typedMemo(PlaceholderItem);

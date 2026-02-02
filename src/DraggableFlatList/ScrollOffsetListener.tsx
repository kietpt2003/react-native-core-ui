import {
  runOnJS,
  useAnimatedReaction,
  SharedValue,
} from "react-native-reanimated";

import { typedMemo } from "@utils/DraggableFlatList/typedMemo";

type Props = {
  scrollOffset: SharedValue<number>;
  onScrollOffsetChange: (offset: number) => void;
};

const ScrollOffsetListener = ({
  scrollOffset,
  onScrollOffsetChange,
}: Props) => {
  useAnimatedReaction(
    () => {
      return scrollOffset.value;
    },
    (cur, prev) => {
      if (cur !== prev) {
        runOnJS(onScrollOffsetChange)(cur);
      }
    },
    [scrollOffset],
  );

  return null;
};

export default typedMemo(ScrollOffsetListener);

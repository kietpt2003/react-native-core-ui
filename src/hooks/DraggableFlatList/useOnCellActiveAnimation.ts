import React from "react";
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

import { DEFAULT_ANIMATION_CONFIG } from "@constant/DraggableFlatList/constants";
import { useAnimatedValues } from "@context/DraggableFlatList/animatedValueContext";
import { useIsActive } from "@context/DraggableFlatList/cellContext";
import { WEB } from "@utils/getOS";

type Params = {
  animationConfig: Partial<WithSpringConfig>;
};

export function useOnCellActiveAnimation(
  { animationConfig }: Params = { animationConfig: {} }
) {
  const animationConfigRef = useSharedValue(animationConfig);

  React.useEffect(() => {
    animationConfigRef.value = animationConfig;
  }, [animationConfig]);

  const isActive = useIsActive();

  // Web version - simplified without Reanimated
  if (WEB) {
    return {
      isActive,
      onActiveAnim: { value: isActive ? 1 : 0 },
    };
  }

  const { isTouchActiveNative } = useAnimatedValues();

  const onActiveAnim = useDerivedValue(() => {
    const toVal = isActive && isTouchActiveNative.value ? 1 : 0;
    return withSpring(toVal, {
      ...DEFAULT_ANIMATION_CONFIG,
      ...animationConfigRef.value,
    } as WithSpringConfig);
  }, [isActive]);

  return {
    isActive,
    onActiveAnim,
  };
}

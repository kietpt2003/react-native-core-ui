// mocks/react-native-gesture-handler.ts

import React from "react";

export const State = {
  UNDETERMINED: 0,
  FAILED: 1,
  BEGAN: 2,
  CANCELLED: 3,
  ACTIVE: 4,
  END: 5,
};

export const PanGestureHandler = ({ children }: any) => children;
export const TapGestureHandler = ({ children }: any) => children;
export const LongPressGestureHandler = ({ children }: any) => children;
export const GestureHandlerRootView = ({ children }: any) => children;

// Reanimated Gesture API (v2 / v3)
const createGesture = () => {
  const gesture = {
    // lifecycle
    onBegin: () => gesture,
    onStart: () => gesture,
    onUpdate: () => gesture,
    onChange: () => gesture,
    onEnd: () => gesture,
    onFinalize: () => gesture,

    // touch events (THIS FIXES YOUR ERROR)
    onTouchesDown: () => gesture,
    onTouchesMove: () => gesture,
    onTouchesUp: () => gesture,
    onTouchesCancelled: () => gesture,

    // config
    enabled: () => gesture,
    shouldCancelWhenOutside: () => gesture,
    simultaneousWithExternalGesture: () => gesture,
    requireExternalGestureToFail: () => gesture,
    hitSlop: () => gesture,
    minDistance: () => gesture,
    maxPointers: () => gesture,
  };

  return gesture;
};

// Reanimated Gesture API (v2 / v3)
export const Gesture = {
  Pan: createGesture,
  Tap: createGesture,
  LongPress: createGesture,
};

export const GestureDetector = ({ children }: any) => children;

export default {
  State,
  PanGestureHandler,
  TapGestureHandler,
  LongPressGestureHandler,
  GestureHandlerRootView,
};

export const FlatList = React.forwardRef<any, any>((props, ref) => {
  return React.createElement("div", { ref }, props.children);
});

// mocks/react-native-reanimated.ts
import React from 'react';

const Animated = {
  // components
  View: ({ style, children, ...rest }: any) =>
    React.createElement("div", rest, children),

  // core
  createAnimatedComponent: <T>(Component: T): T => Component,

  // hooks
  useAnimatedRef: () => ({ current: null }),

  // helpers
  withSpring: (v: any) => v,
};

const createLayoutAnimation = () => {
  const self: any = {
    springify: () => self,
    duration: () => self,
    delay: () => self,
    damping: () => self,
    stiffness: () => self,
    mass: () => self,
    easing: () => self,
  };
  return self;
};

export const FadeIn = {};
export const FadeOut = {};
export const LinearTransition = createLayoutAnimation();

export const useSharedValue = (v: any) => ({ value: v });
export const useAnimatedStyle = () => ({});
export const withTiming = (v: any) => v;
export const runOnJS = (fn: any) => fn;
export const Easing = {};

export const useAnimatedReaction = (
  prepare: () => unknown,
  react: (value: unknown, previous: unknown) => void
) => {
  const previousRef = React.useRef<unknown>();

  React.useEffect(() => {
    const next = prepare();
    react(next, previousRef.current);
    previousRef.current = next;
  });
};

export const useDerivedValue = <T,>(
  factory: () => T,
  deps?: React.DependencyList
) => {
  const value = React.useMemo(factory, deps ?? []);
  return { value };
};

export const runOnUI =
  <Args extends unknown[], Return = void>(
    worklet: (...args: Args) => Return
  ) =>
    (...args: Args): void => {
      // Execute immediately on JS thread (Storybook / Jest)
      worklet(...args);
    };

export const useAnimatedScrollHandler = () => {
  return () => { };
};

export default Animated;

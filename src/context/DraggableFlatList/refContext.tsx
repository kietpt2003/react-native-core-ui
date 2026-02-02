import React from "react";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
  type SharedValue,
  useSharedValue,
  WithSpringConfig,
} from "react-native-reanimated";

import {
  CellData,
  DraggableFlatListProps,
} from "@constant/DraggableFlatList/types";
import { DEFAULT_PROPS } from "@constant/DraggableFlatList/constants";
import { useProps } from "./propsContext";

type RefContextValue<T> = {
  propsRef: React.MutableRefObject<DraggableFlatListProps<T>>;
  animationConfigRef: SharedValue<WithSpringConfig>;
  cellDataRef: React.MutableRefObject<Map<string, CellData>>;
  keyToIndexRef: React.MutableRefObject<Map<string, number>>;
  containerRef: React.RefObject<Animated.View>;
  flatlistRef: React.RefObject<FlatList<T>> | React.ForwardedRef<FlatList<T>>;
  scrollViewRef: React.RefObject<Animated.ScrollView>;
};
const RefContext = React.createContext<RefContextValue<any> | undefined>(
  undefined,
);

export default function RefProvider<T>({
  children,
  flatListRef,
}: {
  children: React.ReactNode;
  flatListRef?: React.ForwardedRef<FlatList<T>> | null;
}) {
  const value = useSetupRefs<T>({ flatListRef });
  return <RefContext.Provider value={value}>{children}</RefContext.Provider>;
}

export function useRefs<T>() {
  const value = React.useContext(RefContext);
  if (!value) {
    throw new Error(
      "useRefs must be called from within a RefContext.Provider!",
    );
  }
  return value as RefContextValue<T>;
}

function useSetupRefs<T>({
  flatListRef: flatListRefProp,
}: {
  flatListRef?: React.ForwardedRef<FlatList<T>> | null;
}) {
  const props = useProps<T>();
  const { animationConfig = DEFAULT_PROPS.animationConfig } = props;

  const propsRef = React.useRef(props);
  propsRef.current = props;
  const animConfig = React.useMemo(
    () =>
      ({
        ...DEFAULT_PROPS.animationConfig,
        ...animationConfig,
      }) as WithSpringConfig,
    [animationConfig],
  );

  const animationConfigRef = useSharedValue(animConfig);
  React.useEffect(() => {
    animationConfigRef.value = animConfig;
  }, [animConfig]);

  const cellDataRef = React.useRef(new Map<string, CellData>());
  const keyToIndexRef = React.useRef(new Map<string, number>());
  const containerRef = React.useRef<Animated.View>(null);
  const flatlistRefInternal = React.useRef<FlatList<T>>(null);
  const flatlistRef = flatListRefProp || flatlistRefInternal;
  const scrollViewRef = React.useRef<Animated.ScrollView>(null);

  // useEffect(() => {
  //   // This is a workaround for the fact that RN does not respect refs passed in
  //   // to renderScrollViewComponent underlying ScrollView (currently not used but
  //   // may need to add if we want to use reanimated scrollTo in the future)
  //   //@ts-ignore
  //   const scrollRef = flatlistRef.current?.getNativeScrollRef();
  //   if (!scrollViewRef.current) {
  //     //@ts-ignore
  //     scrollViewRef(scrollRef);
  //   }
  // }, []);

  const refs = React.useMemo(
    () => ({
      animationConfigRef,
      cellDataRef,
      containerRef,
      flatlistRef,
      keyToIndexRef,
      propsRef,
      scrollViewRef,
    }),
    [],
  );

  return refs;
}

import React from "react";

import { typedMemo } from "@utils/DraggableFlatList/typedMemo";

type CellContextValue = {
  isActive: boolean;
};

const CellContext = React.createContext<CellContextValue | undefined>(
  undefined
);

type Props = {
  isActive: boolean;
  children: React.ReactNode;
};

export function CellProvider({ isActive, children }: Props) {
  const value = React.useMemo(
    () => ({
      isActive,
    }),
    [isActive]
  );
  return <CellContext.Provider value={value}>{children}</CellContext.Provider>;
}

export default typedMemo(CellProvider);

export function useIsActive() {
  const value = React.useContext(CellContext);
  if (!value) {
    throw new Error("useIsActive must be called from within CellProvider!");
  }
  return value.isActive;
}

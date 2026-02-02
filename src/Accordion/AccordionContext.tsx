import React from 'react';

export interface AccordionLayoutContextValue {
  requestRelayout: () => void;
}

export const AccordionLayoutContext =
  React.createContext<AccordionLayoutContextValue | null>(null);

export const useAccordionLayout = () =>
  React.useContext(AccordionLayoutContext);

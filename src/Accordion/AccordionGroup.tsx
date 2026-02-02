import React from 'react';

import { AccordionGroupContextValue, AccordionGroupProps, AccordionId } from './types/AccordionTypes';

const AccordionGroupContext =
  React.createContext<AccordionGroupContextValue | null>(null);

const AccordionGroup: React.FC<AccordionGroupProps> = ({
  children,
  type = 'single',
  defaultOpenIds = [],
}) => {
  const [openIds, setOpenIds] = React.useState(
    () => new Set(defaultOpenIds)
  );

  const toggle = React.useCallback(
    (id: AccordionId) => {
      setOpenIds(prev => {
        const next = new Set(prev);

        if (type === 'single') {
          next.clear();
          if (!prev.has(id)) next.add(id);
        } else {
          next.has(id) ? next.delete(id) : next.add(id);
        }

        return next;
      });
    },
    [type]
  );

  return (
    <AccordionGroupContext.Provider value={{ openIds, toggle }}>
      {children}
    </AccordionGroupContext.Provider>
  );
};

export const useAccordionGroup = () => {
  const ctx = React.useContext(AccordionGroupContext);
  if (!ctx) {
    throw new Error('Accordion must be used inside AccordionGroup');
  }
  return ctx;
};

export const useOptionalAccordionGroup = () => {
  return React.useContext(AccordionGroupContext);
};

export default AccordionGroup;

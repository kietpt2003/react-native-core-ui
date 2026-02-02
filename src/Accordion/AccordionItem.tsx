import React from 'react';

import Accordion from './Accordion';
import { useAccordionGroup } from './AccordionGroup';
import { AccordionItemProps } from './types/AccordionTypes';

const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  header,
  children,
  style,
  disabled,
  onChange,
}) => {
  const { openIds, toggle } = useAccordionGroup();

  const expanded = openIds.has(id);

  return (
    <Accordion
      header={header}
      expanded={expanded}
      onChange={(ex) => {
        toggle(id);
        onChange && onChange(ex);
      }}
      style={style}
      disabled={disabled}
    >
      {children}
    </Accordion>
  );
};

export default AccordionItem;

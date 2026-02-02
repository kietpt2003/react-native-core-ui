import React from 'react';

import {
  AccordionTreeItemProps,
  AccordionTreeProps,
} from './types/AccordionTypes';
import AccordionGroup, { useOptionalAccordionGroup } from './AccordionGroup';
import AccordionTreeInternal from './AccordionTreeInternal';

const AccordionTreeWithGroup: React.FC<
  AccordionTreeProps & {
    renderItem?: (params: AccordionTreeItemProps) => React.ReactNode;
    renderRootItem?: (params: AccordionTreeItemProps) => React.ReactNode;
  }
> = (props) => {
  const group = useOptionalAccordionGroup();

  if (group) {
    return <AccordionTreeInternal {...props} level={0} path="0" />;
  }

  return (
    <AccordionGroup type={props.type}>
      <AccordionTreeInternal {...props} level={0} path="0" />
    </AccordionGroup>
  );
};

export default AccordionTreeWithGroup;

import { useContext, useEffect } from 'react';

import { Element, BodyContext } from '@/shared/contexts/BodyContext';

export const useBodyOverflow = (element:Element) => {
  const { addElement, removeElement } = useContext(BodyContext);
  useEffect(() => {
    if (element.condition) {
      addElement(element.elementId);
    } else {
      removeElement(element.elementId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [element.condition]);
};

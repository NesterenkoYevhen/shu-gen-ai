'use client';

import {
  ReactNode, createContext, useCallback, useEffect, useMemo, useState,
} from 'react';
import { usePathname } from 'next/navigation';

export interface Element {
  elementId:string;
  condition:boolean;
}
interface BodyContextValue {
  addElement:(element:string)=> void;
  removeElement:(element:string)=> void;
}

export const BodyContext = createContext<BodyContextValue>({
  addElement: () => {},
  removeElement: () => {},
});

interface BodyContextProviderProps {
  children:ReactNode;
}
export const BodyContextProvider = ({ children }:BodyContextProviderProps) => {
  const [elementsId, setElements] = useState<Record<string, number>>({});
  console.log(elementsId);
  const pathname = usePathname();
  const addElement = useCallback((element:string) => {
    if (elementsId[element]) {
      return;
    }
    setElements((prev) => ({ ...prev, [element]: 1 }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeElement = useCallback((element:string) => {
    setElements((prev) => {
      const data = { ...prev };
      delete data[element];
      return data;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Object.keys(elementsId).length > 0) {
      document.getElementsByTagName('body')[0].classList.add('openOverlay');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('openOverlay');
    }
  }, [elementsId]);

  useEffect(() => {
    setElements({});
  }, [pathname]);

  const value = useMemo(() => ({
    addElement,
    removeElement,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <BodyContext.Provider value={value}>
      {children}
    </BodyContext.Provider>
  );
};

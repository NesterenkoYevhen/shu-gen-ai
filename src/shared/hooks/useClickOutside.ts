import { useEffect, useCallback, RefObject } from 'react';

export const useClickOutside = (
  elementRef: RefObject<HTMLDivElement>,
  setIsOpen: (value: any) => void,
  value: null | boolean,
) => {
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
      setIsOpen(value);
    }
  }, [elementRef, setIsOpen, value]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};

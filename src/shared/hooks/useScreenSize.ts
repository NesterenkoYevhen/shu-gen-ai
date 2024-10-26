/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';

export const useScreenSize = (size: string) => {
  const [isSize, setIsSize] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSize(window.innerWidth <= parseInt(size, 10));
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [size]);

  return isSize;
};

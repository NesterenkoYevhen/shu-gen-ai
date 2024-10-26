import {
  useRef, useEffect, useState, ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import styles from './Portal.module.scss';

interface PortalProps {
  children: ReactNode
}

export const Portal = ({ children }: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#app-modal');
    setMounted(true);
  }, []);

  return (mounted && ref.current)
    ? createPortal(<div className={styles.root}>{children}</div>, ref.current)
    : null;
};

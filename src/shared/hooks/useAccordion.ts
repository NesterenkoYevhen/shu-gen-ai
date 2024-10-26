import {
  Ref, useCallback, useEffect, useRef,
} from 'react';
import { useBoolean } from './useBoolean';

interface UseAccordionResult<T extends HTMLElement> {
  ref: Ref<T>;
  isVisible: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
  updateAccordion: () => void;
}

export const useAccordion = <T extends HTMLElement>(
  initOpen = false,
  animationDuration = 300): UseAccordionResult<T> => {
  const [isVisible, setVisible] = useBoolean(initOpen);
  const ref = useRef<T | null>(null);
  const updateAccordion = useCallback(() => {
    if (!ref.current) return;
    if (isVisible) {
      const height = `${ref.current.scrollHeight}px`;
      ref.current.style.setProperty('--max-height', height);
      setTimeout(() => {
        // ref.current?.style.removeProperty('margin-top');
        ref.current?.style.setProperty('--max-height', 'auto');
        ref.current?.style.setProperty('height', 'fit-content');
        ref.current?.style.removeProperty('overflow');
      }, animationDuration);
    } else {
      const height = `${ref.current.scrollHeight}px`;
      ref.current?.style.setProperty('--max-height', height);
      // ref.current?.style.setProperty('margin-top', '-16px');
      setTimeout(() => {
        ref.current?.style.setProperty('overflow', 'hidden');
        ref.current?.style.setProperty('--max-height', '0');
      }, 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);
  useEffect(() => {
    if (!ref.current) return;
    const initialHeight = initOpen ? `${ref.current?.scrollHeight}px` : '0px';
    if (initOpen) {
      // ref.current?.style.removeProperty('margin-top');
      ref.current?.style.removeProperty('overflow');
    } else {
      ref.current?.style.setProperty('overflow', 'hidden');
      // ref.current?.style.setProperty('margin-top', '-16px');
    }
    ref.current.style.setProperty('--max-height', initialHeight);
    ref.current.style.setProperty('max-height', 'var(--max-height)');
    ref.current.style.setProperty('transition', `all ${animationDuration}ms ease`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initOpen]);

  useEffect(() => {
    updateAccordion();
  }, [updateAccordion, isVisible]);

  return {
    ref, isVisible, toggle: setVisible.toggle, close: setVisible.off, open: setVisible.on, updateAccordion,
  };
};

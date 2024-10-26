/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ReactNode, memo } from 'react';

import cn from 'classnames';

import styles from './ModalWindow.module.scss';

interface ModalWindowProps {
  className?: string;
  isOpen:boolean;
  onClose:() => void;
  children:ReactNode;
}

export const ModalWindow = memo(({
  className, isOpen, onClose, children,
}:ModalWindowProps) => (
  <div className={cn(styles.root, { [styles.open]: isOpen }, className)}>
    <div className={cn(styles.overlay, 'bg-overlay-light dark:bg-overlay-dark')} onClick={onClose} />
    <div className={cn(styles.content, 'relative bg-background-light dark:bg-additionalGrey400-dark')}>
      {children}
    </div>
  </div>
));
